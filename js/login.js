$(function(){
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机号
	var myreg2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;//只含有数字和字母，6-10位
	$(".log-name2 ").click(function(){
		$(".MainLeftBox2").css("display","none");
		$(".MainLeftBoxEmail").css("display","block");
	})
	$(".log-name1 ").click(function(){
		$(".MainLeftBox2").css("display","block");
		$(".MainLeftBoxEmail").css("display","none");
	})
	$(".log-name").click(function(){
		$(this).addClass("logName").siblings().removeClass("logName");
	})
	
	$("#logBtnLog").click(function(){
		var userNcon = document.getElementById("username").value;
		var passWcon = document.getElementById("password").value;
		var flag1 = false;
		var flag2 =false;
		if(myreg.test(userNcon)){
			flag1 = true;
		}
		if(myreg2.test(passWcon)){
			flag2 = true;;
		}
		
		
		console.log(flag1,flag2)
		if(flag1&&flag2){
			$.ajax({
				type:"post",
				url:"http://h6.duchengjiu.top/shop/api_user.php",
				async:true,
				header:'application/x-www-form-urlencoded',
				data:{
					status:"login",
					username:userNcon,
					password:passWcon
				},
				success:function(data){
					console.log(data);
					window.location.href="../index.html";
					setCookie("isLogin",userNcon,0.1);
				}
			});
		}
		
	})
})
