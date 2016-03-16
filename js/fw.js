// 通用框架方法
var Common = {
	// 获取URL参数
	GetUrlParms: function() {
		var args = new Object();
		var query = location.search.substring(1); //获取查询串
		var pairs = query.split("&"); //在逗号处断开
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('='); //查找name=value
			if (pos == -1) continue; //如果没有找到就跳过
			var argname = pairs[i].substring(0, pos); //提取name
			var value = pairs[i].substring(pos + 1); //提取value
			args[argname] = unescape(value); //存为属性
		}
		return args;
	},

	// 保存access_token
	SaveAccessToken: function(access_token) {
		localStorage.setItem("access_token", access_token);
	},

	// 获取access_token
	GetAccessToken: function() {
		return localStorage.getItem("access_token");
	},
};

// 调用API通用方法
var Api = {

	// API域名
	api_domain: "http://fangdoudou666.imwork.net/",

	// 接口列表
	api_get_token: "Token",
	api_register: "api/Member/Register",
	api_login_in: "api/Member/Login",

	/**
	 * 通用post请求
	 **/
	Post: function(api, data, success) {
		data = (data == null || data == "" || typeof(data) == "undefined") ? {} : data;
		data.InnerVersion = plus.runtime.innerVersion;
		data.Version = plus.runtime.version;
		var platform = mui.os.android ? "android" : mui.os.ios ? "ios" : "other";
		data.Platform = platform;
		data.SupportPlus = mui.os.plus;
		$.ajax({
			type: "post",
			data: data,
			dataType: 'json',
			headers: {
				"Authorization": "Bearer " + Common.GetAccessToken()
			},
			url: api_domain + api,
			dataType: "json",
			success: function(data) {
				if (data.ResultType == 0) {
					success(data);
				} else {
					mui.toast(data.Message);
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast("系统异常，请联系管理员。");
			}

		});
	},
};