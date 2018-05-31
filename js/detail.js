			$(function(){
				var oZoomBox = document.getElementById("zoomBox");
				var oMidArea = document.getElementById("midArea");
				var midImg =oMidArea.children[0];
				var oZoom = document.getElementById("zoom");
				var oBigArea = document.getElementById("bigArea");
				var oBigImg = oBigArea.children[0];
				var smallArea=document.getElementById("smallArea");
				var smaImg = smallArea.children[0];
				$.ajax({
					type:"get",
					url:"http://h6.duchengjiu.top/shop/api_goods.php",
					async:true,
					success:function(data){
						var data= data.data;
						var len = data.length;
						var str = "";
						for(var i =0 ;i<len;i++){
							if(getCookie("proDetail")!=undefined){
								if(getCookie("proDetail")==data[i].goods_id){
									oBigImg.src= data[i].goods_thumb;
									smaImg.src = data[i].goods_thumb;
									midImg.src = data[i].goods_thumb;
									console.log(data[i])
								}
							}
						}
						
					}	
				});
				if(getCookie("proDetail")&&getCookie("proDetailCartId")!=undefined){
					var goDetail = getCookie("proDetail");
					var fenlei = getCookie("proDetailCartId");
					$.ajax({
						type:"get",
						url:"http://h6.duchengjiu.top/shop/api_goods.php",
						async:true,
						data:{
							cat_id:fenlei,
							pagesize:120
						},
						success:function(data){
							var data = data.data;
							var str = "";
							for(var j =0;j<data.length;j++){
								if(goDetail==data[j].goods_id){
									console.log(data[j].goods_id)
										oBigImg.src= data[j].goods_thumb;
										smaImg.src = data[j].goods_thumb;
										midImg.src = data[j].goods_thumb;
										console.log(data[j])
										str = `
										<h3 class='detailInfoName'>${data[j].goods_name}</h3>
							<a class="detailInfoTitle" href=''>${data[j].goods_desc}</a>
							<div class="detailPrice">
								
									<span class="shoujia">售价：</span>
									<strong class="jiage">
										
										<i class="jg">¥${data[j].price}</i> 
										<i class="by">包邮 参考价 
											<i>¥${Number(data[j].price)+Number(100)+".00"}</i>
											<br />
											<span> 黑卡下单再享96折    开通黑卡</span>
										</i>
									</strong>
								
							</div>
							<p><span>活动</span>新人专享 工厂店新人专享</p>
							<p><span>运费至</span>河南/济源市/济源市  免运费</p>
							<div class="m-buyBox">
							  <span>数量</span>
							  <em>
							    <span>
							      <a href="javascript:void(0);">-</a>
							      <input type="text" value="1">
							      <a href="javascript:void(0);">+</a>
							    </span>
							    <span>单次限购1件</span>
							  </em>
							</div>
							<div class="huiyuan">说明黑卡会员96折 支持30天无忧退货不可支持使用优惠券</div>
							<button data-cat_id="${data[j].cat_id}" data-id ="${data[j].goods_id}" class="addCart">添加购物车</button>
							<span class="like">收藏</span>
						</div>
						`;
								}
							}
							$(".detailRightInfo")[0].innerHTML=str;
							var $addCart = $(".addCart");
								if(getCookie("goCart") !== undefined){
									var obj = JSON.parse(getCookie("goCart"));
									console.log(obj)
								}else{
									var obj = {};
								}
							for(var d = 0; d<$addCart.length;d++){
								
								//购物车商品数量
//								if(getCookie("goCart")!="{}"){
//									var objNum =JSON.parse(getCookie("goCart"));
//								}
//								 
//								console.log(objNum)
//								var oNum = 0;
//								for(var n in objNum){
//									oNum+=objNum[n];
//										
//								}
//								

								console.log(getCookie("goCart")=="{}")
								var objNum =JSON.parse(getCookie("goCart")); 
								if(objNum!=null){
									
								}
								console.log(objNum!=null)
									var oNum = 0;
									for(var n in objNum){
										oNum+=Number(objNum[n]);
										
									}
								$(".cartNum")[0].children[2].innerHTML=oNum
								$(".cartNum")[0].onclick=function(){
									window.location.href="../htmls/cart.html"
								}
//								$(".index-cart")[0].innerHTML=oNum;
								$addCart[d].index= d;
								console.log($addCart.length)
								//$(".index-cart")[d].index=d;
								$addCart[d].onclick=function(){
//									$(".cartNum")[0].innerHTML="";
									var goCart =  $($addCart[this.index]).attr("data-id");
									var goCartCat_id =  $($addCart[this.index]).attr("data-cat_id");
									if(obj[goCart]==undefined){
										obj[goCart]=1;
									}else{
										obj[goCart]++;
									}
									var objToStr = JSON.stringify(obj)
									setCookie("goCart",objToStr);
									setCookie("goCartCat_id",goCartCat_id,7)
									var objNum =JSON.parse(getCookie("goCart")); 
									var oNum = 0;
									for(var n in objNum){
										oNum+=Number(objNum[n]);
										
									}
									console.log($(".cartNum")[0].children[2])
//									console.log($(".proIndex"))
									$(".cartNum")[0].children[2].innerHTML=oNum;
//									window.location.href="../htmls/cart.html"
								}
							}
							
							
						}
					});
				}
				
				
				
				oMidArea.onmouseover = function(){
					oZoom.style.display = "block";
					oBigArea.style.display = "block";
				}
				oMidArea.onmouseout = function(){
					oZoom.style.display = "none";
					oBigArea.style.display = "none";
				}
				oMidArea.onmousemove = function(e){
					var evt = e || event;
					var _left = evt.pageX -oZoomBox.offsetLeft - oZoom.offsetWidth/2;
					var _top = evt.pageY - oZoomBox.offsetTop -oZoom.offsetHeight/2;
					
					
					if(_left<=0){
						_left = 0;
					}
					if(_left >= oMidArea.offsetWidth-oZoom.offsetWidth){
						_left = oMidArea.offsetWidth-oZoom.offsetWidth;
					}
					
					if(_top<=0){
						_top = 0;
					}
					
					if(_top>=oMidArea.offsetHeight-oZoom.offsetHeight){
						_top=oMidArea.offsetHeight-oZoom.offsetHeight;
					}
					oZoom.style.left = _left + "px";
					oZoom.style.top = _top + "px";
					
					//大图移动
					oBigImg.style.left = -oZoom.offsetLeft/oMidArea.offsetWidth*oBigImg.offsetWidth + "px";
					oBigImg.style.top = -oZoom.offsetTop/oMidArea.offsetHeight*oBigImg.offsetHeight + "px";
					
				}
			})
			
		
			
			