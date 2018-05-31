$(function(){
	/*---------判断分类cat_id是否传入并获取-----------*/
	if(getCookie("goCartCat_id") !== undefined) {
		var cat_Id = getCookie("goCartCat_id");
		/*----------获取cookie中的商品id及对应的商品数量------判断商品种类及数量不为空的情况下，请求数据--------*/
		if(getCookie("goCart") !="{}"){
			$.ajax({
				type:"get",
				url:"http://h6.duchengjiu.top/shop/api_goods.php",
				data:{cat_id:cat_Id,pagesize:120},
				async:true,
				success:function(data){
					var obj = JSON.parse(getCookie("goCart"));
					var data = data.data;
					var str = "";
					var titStr="";
					var oAll=0;
					/*----遍历数据并且与cookie中的商品id比对，相等的话加载出该条数据----*/
					for(var i =0;i<data.length;i++){
						for (var attr in obj ) {
							if(attr==data[i].goods_id){
								oAll+= obj[attr]*data[i].price;
								str+="<li><div class='single'><input type='checkbox'></div><div class='cartImg'><img src='"+data[i].goods_thumb+"'/></div><div class='cartInfo'><a href='#'>"+data[i].goods_name+"</a><p>"+data[i].goods_desc+"</p></div><div class='cartPrice'>"+data[i].price+"</div><div class='cartCount'><span><span  class='decAttr' data-id='"+data[i].goods_id+"'>-</span><strong>"+obj[attr]+"</strong><span class='addAttr' data-id='"+data[i].goods_id+"'>+</span></span></div><div data-price='"+data[i].price+"' class='allPrice'>"+data[i].price*obj[attr]+".00</div><div class='cartDelete'><a data-id='"+data[i].goods_id+"' class='delBtn'>删除</a><a>移入我的收藏</a></div></li>";
								titStr = "<div class='titPrice'><div><label for=''><input type='checkbox' id='checkOther'>反选</label></div><div class='tot'>总计：￥:<i class='totP'>"+oAll+"</i></div><div class='pay'>结算</div></div>";
							}
						}
					}
					$("#myCart ul")[0].innerHTML+=str; 
					$("#myCart")[0].innerHTML+=titStr; 
					for(var i =0;i<$(".decAttr").length;i++){
						
						$(".allPrice")[i].index =i;
						var $decAttr = $(".decAttr");
						$decAttr[i].index=i;
						//-----------------------点击商品数量-1----------最小为1
						$decAttr[i].onclick=function(){
							$decAttr[this.index].parentNode.parentNode.nextSibling.innerHTML="";
							var price= $($decAttr[this.index].parentNode.parentNode.nextSibling).attr("data-price");
							var decId =$($decAttr[this.index]).attr("data-id") ;
							obj[decId]--;
							if(obj[decId]<=1){
								obj[decId]=1;
								$decAttr[this.index].parentNode.children[1].innerHTML=obj[decId];
								$decAttr[this.index].parentNode.parentNode.nextSibling.innerHTML=Number(obj[decId])*Number(price)+".00";
							}
							$decAttr[this.index].parentNode.children[1].innerHTML=obj[decId];
							$decAttr[this.index].parentNode.parentNode.nextSibling.innerHTML=Number(obj[decId])*Number(price)+".00";
							console.log(obj[decId])
							
							objToStr = JSON.stringify(obj);
							setCookie("goCart",objToStr,7)
							var tot = 0;
							for(var i=0;i<$(".allPrice").length;i++){
								var tot=tot+Number($(".allPrice")[i].innerHTML);
							}
							$(".totP")[0].innerHTML=tot;
						}
						var $addAttr = $(".addAttr");
						$addAttr[i].index=i;
						//-----------------------点击商品数量+1------------最大为20
						$addAttr[i].onclick=function(){
							var price= $($addAttr[this.index].parentNode.parentNode.nextSibling).attr("data-price");
							$addAttr[this.index].parentNode.parentNode.nextSibling.innerHTML="";
							var addId =$($addAttr[this.index]).attr("data-id") ;
							obj[addId]++;
							$addAttr[this.index].parentNode.parentNode.nextSibling.innerHTML=obj[addId]*price+".00";
							$addAttr[this.index].parentNode.children[1].innerHTML=obj[addId];
							if(obj[addId]>20){
								obj[addId]=20;
							}
							objToStr = JSON.stringify(obj);
							setCookie("goCart",objToStr,7);
							var tot = 0;
							for(var i=0;i<$(".allPrice").length;i++){
								var tot=tot+Number($(".allPrice")[i].innerHTML);
							}
							$(".totP")[0].innerHTML=tot;
						}
					}
					
					
					
					/*--------删除商品-------------*/
					var $delBtn = $(".delBtn");
					var obj = JSON.parse(getCookie("goCart"));
					for(var j =0;j<$delBtn.length;j++){
						$delBtn[j].index = j;
						$delBtn[j].onclick=function(){
							var obj = JSON.parse(getCookie("goCart"));
//							window.location.reload();
							var delProId = $($delBtn[this.index]).attr("data-id");
							$delBtn[this.index].parentNode.parentNode.remove();
							console.log(attr)
							for(var delattr in obj){
								
								if(delProId==delattr){
//									console.log(delattr+"=delattr"+"--------"+delProId+"==delProId")
									delete obj[delattr];
								}
							}
							console.log(obj)
							var objStr = JSON.stringify(obj);
							setCookie("goCart",objStr,7);
							//--------判断购物车商品为0重新加载页面--------------
							getCookie("goCart");
							if(getCookie("goCart")=="{}"){
								window.location.reload();
							}
						}
					}
					
					function checked(){
						$("#checkAll").click(function(){
							$("ul input").prop("checked",$(this).prop("checked"));
						})
						$("ul input").click(function(){
							if($("ul input:checked").length == $("ul input").length){
								$("#checkAll").prop("checked",true);
							}else{
								$("#checkAll").prop("checked",false);
							}
							
						})
						$("#checkOther").click(function(){
							$("ul input").each(function(){
								$(this).prop("checked",!$(this).prop("checked"));
							})
						})
					}
					checked();
				}
			});
		}else{
			
			$("#myCart")[0].innerHTML="<h2 class='empty'>购物车空空如也~赶快去  <span>&gt;</span><a href='../htmls/productList.html'>购物</a>吧</h2>";
		}
	}
})
