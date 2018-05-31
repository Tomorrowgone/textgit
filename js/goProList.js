				//去列表页
				$.ajax({
					type: "get",
					url: "http://h6.duchengjiu.top/shop/api_cat.php",

					async: true,
					success: function(data) {
						var $oLi = $(".proUl li");
						console.log(data);
						var data = data.data;
						for(var i = 0; i < $oLi.length; i++) {
							console.log(data.length)
							$($oLi[i]).attr("data-cat_id", data[i].cat_id);
						}

						for(var j = 0; j < $oLi.length; j++) {
							$oLi[j].index = j;
							$oLi[j].onclick = function() {
								window.location.href = "../htmls/productList.html";
								var goProCartId = $($oLi[this.index]).attr("data-cat_id");
								setCookie("goPro", goProCartId, 7)
							}

						}

					}
				});