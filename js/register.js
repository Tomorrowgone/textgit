$(function(){
	var userCon= document.getElementById("user");
	var psdCon = document.getElementById("psd");
	var maskid = document.getElementById("maskid");
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机号
	var myreg2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;//只含有数字和字母，6-10位
	var num = null;
	
	
	var flag3 = false; 
	num = Math.floor(Math.random()*8999+1000);
	register();
	function register(){
		/*********用户名**********/
		userCon.oninput=function(){
			var flag1 = false; 
			var userConVal= document.getElementById("user").value;
			if(myreg.test(userConVal)){
				$(".info1-False")[0].style.display="none";
				$(".info1-False")[0].innerHTML="";
				$(".info1")[0].style.display="none";
				flag1=true;
			/***********密码*********/	
				psdCon.oninput=function(){
				var flag2 = false; 
				var psdConVal = document.getElementById("psd").value;
				$(".info2")[0].style.display="block";
				$(".info2-False")[0].style.display="block";
				$(".info2-False")[0].innerHTML="密码格式不正确";
				if(myreg2.test(psdConVal)){
					$(".info2-False")[0].style.display="none";
					$(".info2")[0].style.display="none";
					$(".info2-False")[0].innerHTML="";
					flag2=true;
					
					
					maskid.oninput=function(){
						$(".info3-False")[0].style.display="block";
						$(".info3")[0].style.display="block";
						$(".info3-False")[0].innerHTML="验证码错误";
						
						
						
						num = String(num);
						var maskidCon = document.getElementById("maskid").value;
						var regCard = document.getElementById("regCard");
						regCard.innerHTML=num;
						regCard = regCard.innerHTML;
						var flag3 = false; 
						if(maskidCon==regCard){
							
							$(".info3-False")[0].style.display="none";
							$(".info3")[0].style.display="none";
							$(".info3-False")[0].innerHTML="";
							
							flag3=true;
							console.log(flag1,flag2,flag3)
							if(flag1&&flag2&&flag3){
								$(".register").click(function(){
								
									console.log(11)
									$.ajax({
										type:"post",
										url:"http://h6.duchengjiu.top/shop/api_user.php",
										Header:'application/x-www-form-urlenc',
										data:{
											status:"register",
											username:userConVal,
											password:psdConVal
											},
										async:true,
										success:function(data){
											console.log(data);
											psdConVal="";
											userConVal="";
											regCard.innerHTML="";
											window.location.href="login.html";
										}
									});
								
								})
							}else{
								return false;
							}
						}
					}
					
					
					
				
					
					
					
					
					
				}
				console.log(flag1,flag2);
				
			}
				
				
				
				
				
				
				
				
			}else{
				$(".info1-False")[0].style.display="block";
				$(".info1")[0].style.display="block";
				$(".info1-False")[0].innerHTML="请输入合法的用户名";
			}
			console.log(flag1)
			
			
		}
		
	}
	
	
	$("#regCard").click(function(){
		$("#regCard")[0].innerHTML=num;
	})
//	function isPoneAvailable($poneInput) {  
//        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
//        if (!myreg.test("$poneInput.val()")) {  
//            return false;  
//        } else {  
//            return true;  
//        }  
//    }  
//    isPoneAvailable();
      
	
})

