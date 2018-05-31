$(function(){
	var oLoadPro = document.getElementById("loadPro-wrap");
	
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
			
/*加载首页商品*/		
	loadProtit();
	function loadProtit(){
		$.ajax({
						
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_cat.php",
			async:true,
			success:function(data){
				var data = data.data;
				var str = "";
				for (var i=0;i<data.length;i++) {
					str+="<div class='loadPro'><h2>"+data[i].cat_name+"</h2><ul></></div>";	
				}
				oLoadPro.innerHTML=str;
				loadProList();
				function loadProList(){
					var oProList = oLoadPro.children;
					var proUlList =oProList;
					var len = oProList.length;
						
//							console.log(proUlList[n].children[1])
							$.ajax({
								type:"get",
								url:"http://h6.duchengjiu.top/shop/api_goods.php",
								async:true,
								success:function(data){
									console.log(data)
									var data = data.data;
									
									
									for(var n=0;n<len;n++){
										var proStr ="";
										for(var j=0;j<data.length;j++){
											proStr+="<li data-id='"+data[j].goods_id+"'><a href=''><img data-id='"+data[j].goods_id+"' src='"+data[j].goods_thumb+"'/></a><div><a href=''>"+data[j].goods_name+"</a><a href=''>"+data[j].goods_desc+"</a><p><strong><span>￥:</span>"+data[j].price+"</strong><button class='detailBtn' data-id='"+data[j].goods_id+"'>立即购买</button></p></div></li>";
										}
										
										
										proUlList[n].children[1].innerHTML=proStr;
										//floorNav-------------------------
										var $floorNav = $("#floorNav");
											var $navList = $("#floorNav").find("li");
											var $conList = $("#loadPro-wrap").find(".loadPro");
											var flag = true;
											$(window).scroll(function(){
												if(flag){
													var scrollTop = $(this).scrollTop();
													if(scrollTop > 100){
														$floorNav.fadeIn();
													}else{
														$floorNav.fadeOut();
													}
													$conList.each(function(){
														if(scrollTop<400){
															$navList.eq(1).addClass("selectLi").siblings().removeClass("selectLi");
														}
														if(scrollTop > $(this).offset().top-$(this).outerHeight()/2){
															var index = $(this).index();
															$navList.eq(index+2).addClass("selectLi").siblings().removeClass("selectLi");
														}
														if(scrollTop>9600){
															$navList.not(":last").removeClass("selectLi");
														}
													})
												}
											})
											$navList.not(":last").click(function(){
												flag = false;
												var index = $(this).index();
												$(this).addClass("selectLi").siblings().removeClass("selectLi");
												if(index==0){
													window.location.href="index.html";
												}else if(index==1){
													$("body,html").stop().animate({"scrollTop":400},500,function(){
														flag = true;
													});
												}else{
													$("body,html").stop().animate({"scrollTop":$conList.eq(index-2).offset().top},500,function(){
														flag = true;
													});
												}
												$(this).addClass("hover").siblings().removeClass("hover");
												
											})
											$navList.last().click(function(){
												//flag = false;
												$("body,html").stop().animate({"scrollTop":0},500,function(){
													//flag = true;
												});
											})
									}
									/*----------------去商品列表页------------------*/
										$.ajax({
											type:"get",
											url:"http://h6.duchengjiu.top/shop/api_cat.php",
											
											async:true,
											success:function(data){
												var $oLi = $(".proUl li");
												console.log(data);
												var data= data.data;
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
												
											}
										});
										/*****************/
										var $goDetail = $(".detailBtn");
//										console.log($goDetail.length);
										var btnLen = $goDetail.length;
										for(var m=0;m<btnLen;m++){
											$goDetail[m].index=m;
											$goDetail[m].onclick=function(){
//												console.log($goDetail[this.index]);
//												console.log($($goDetail[this.index]).attr("data-id"));
												var detailId = $($goDetail[this.index]).attr("data-id");
//												console.log(detailId);
												setCookie("proDetail", detailId, 7);
												window.open("../htmls/detail.html");     
											}
										}
								}
							});
				}
				
			}
		});
	}
	

/*floorNav*/
			
				

})
				