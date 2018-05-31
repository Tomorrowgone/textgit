$(function(){
	/*轮播图*/
	autoImg();
	function autoImg(){
		//find搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法。
				var $banner = $("#banner"),
					$picList = $banner.find(".pic li"),
				    $navbar = $(".navbar"),
				    $navList = $navbar.find("li");
				var count = 0;
				function move(){
					$picList.eq(count).fadeIn().siblings().fadeOut();
				}
				
				move();
				
				setInterval(function(){
					count++;
					if(count==$picList.length){
						count = 0;
					}
					move();
					$navList.eq(count).addClass("select").siblings().removeClass("select");
					
				},3000)
	}
	
	
	
	getCookie("goPro");
	var goDetail =getCookie("goPro");
	console.log(goDetail)
	$.ajax({
		type:"get",
		url:"http://h6.duchengjiu.top/shop/api_cat.php",
		async:true,
		success:function(data){
//			console.log($(".proBox")[0]);
			var data= data.data;
			var $oLi = $(".proUl li");
			console.log(data);
			for (var i= 0;i <$oLi.length;i++) {
				console.log(data.length)
				$($oLi[i]).attr("data-cat_id",data[i].cat_id);
			}
												
			for(var j =0;j<$oLi.length;j++){
					$oLi[j].index= j;
				$oLi[j].onclick=function(){
					window.location.href="../htmls/productList.html";
					var goProCartId = $($oLi[this.index]).attr("data-cat_id");
					setCookie("goPro",goProCartId,7)
//														$.ajax({
//															type:"get",
//															url:"http://h6.duchengjiu.top/shop/api_goods.php",
//															async:true,
//															data:{cat_id:goDetailId,pagesize:50},
//															success:function(data){
//																var data= data.data;
//																for(var i = 0;i<data.length;i++){
//																	console.log(data[i])
//							//										console.log(data[i].goods_name);
//																}
//																
//															}
//														}); 
				}
													
			}
			
			for (var i=0;i<data.length;i++ ) {
				if(goDetail==data[i].cat_id){
					$(".proBox")[0].innerHTML="<h2 class='proListTitle' data-cat_id='"+data[i].cat_id+"'>"+data[i].cat_name+"</h2>";
					$.ajax({
						type:"get",
						url:"http://h6.duchengjiu.top/shop/api_goods.php",
						data:{cat_id:goDetail,pagesize:120},
						async:true,
						success:function(data){
							var data= data.data;
							console.log(data)
							if(data==""){
								alert('暂无此类商品')
							}
							var detailCartId = goDetail;
							var str = "";
							for(var i =0 ;i<data.length;i++){
								str+="<div class='proListChild'><img class='proListChildImg' src='"+data[i].goods_thumb+"'/><div class='proListChildTit'><a class='proTxt' href=''>"+data[i].goods_name+"</a><a class='proTxt' href=''>"+data[i].goods_desc+"</a><span class='proPrice'>￥:"+data[i].price+"</span><p data-cat_id='"+data[i].cat_id+"' data-id='"+data[i].goods_id+"' class='cartProBtn'>加入购物车</p></div></div>";	
								console.log(data[i].cat_id);
							}
							
							$(".proBox")[0].innerHTML+=str;
							var $proListChild = $(".proListChild");
							for(var m =0 ;m<$proListChild.length;m++){
								if((m+1)%4==0){
									$proListChild[m].style.marginRight=0;
								}
							}
							//去详情页面
								var $cartProBtn = $(".cartProBtn");
								for(var b = 0; b<$cartProBtn.length;b++){
									$cartProBtn[b].index= b;
									$cartProBtn[b].onclick=function(){
										var ProDetailBtnId= $($cartProBtn[this.index]).attr("data-id");
										console.log(ProDetailBtnId);
										setCookie("proDetail",ProDetailBtnId,7);
										setCookie("proDetailCartId",detailCartId,7);
										window.location.href="../htmls/detail.html"
									}
								}
								
								
							}
						});
									}
								
							}
						}
					});
	
})
