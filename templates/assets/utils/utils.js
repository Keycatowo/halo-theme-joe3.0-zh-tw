/**
 * 主題所用工具類
 */
class Emoji {
	constructor(name, description, category, style) {
		this.name = name;
		this.description = description;
		this.category = category;
		this.style = style;
		this.extension = ["tieba"].includes(category) ? "gif" : "png";
	}
}

const hahaEmoji = [
	new Emoji("kuxiao", "哭笑", "haha"),
	new Emoji("heng", "哼", "haha"),
	new Emoji("guzhang", "鼓掌", "haha"),
	new Emoji("haha", "哈哈", "haha"),
	new Emoji("aini", "愛你", "haha"),
	new Emoji("bazhang", "巴掌", "haha"),
	new Emoji("beishang", "悲傷", "haha"),
	new Emoji("han", "汗", "haha"),
	new Emoji("deyi", "得意", "haha"),
	new Emoji("ok", "ok", "haha"),
	new Emoji("touxiao", "偷笑", "haha"),
	new Emoji("wabikong", "挖鼻孔", "haha"),
	new Emoji("weiqu", "委屈", "haha"),
	new Emoji("weixiao", "微笑", "haha"),
	new Emoji("huaixiao", "壞笑", "haha"),
	new Emoji("woshou", "握手", "haha"),
	new Emoji("wulian", "捂臉", "haha"),
	new Emoji("xiaku", "嚇哭", "haha"),
	new Emoji("xiaoku", "笑哭", "haha"),
	new Emoji("xixi", "嘻嘻", "haha"),
	new Emoji("qinqin", "親親", "haha"),
	new Emoji("qiwang", "期望", "haha"),
	new Emoji("chanzui", "饞嘴", "haha"),
	new Emoji("huaxin", "花心", "haha"),
	new Emoji("hufen", "互粉", "haha"),
	new Emoji("keai", "可愛", "haha"),
	new Emoji("kelian", "可憐", "haha"),
	new Emoji("bishi", "鄙視", "haha"),
	new Emoji("bizui", "閉嘴", "haha"),
	new Emoji("yep", "耶", "haha"),
	new Emoji("zan", "贊", "haha"),
	new Emoji("yihuo", "疑惑", "haha"),
	new Emoji("yinxiao", "陰笑", "haha"),
	new Emoji("yiwen", "疑問", "haha"),
	new Emoji("bujiandan", "不簡單", "haha"),
	new Emoji("bye", "拜拜", "haha"),
	new Emoji("chigua", "吃瓜", "haha"),
	new Emoji("chijing", "吃驚", "haha"),
	new Emoji("chuitou", "錘頭", "haha"),
	new Emoji("dahaqian", "打哈欠", "haha"),
	new Emoji("fahuo", "發火", "haha"),
	new Emoji("bang", "棒", "haha"),
	new Emoji("gou", "狗", "haha"),
	new Emoji("guolai", "過來", "haha"),
	new Emoji("haixiu", "害羞", "haha"),
	new Emoji("hashiiqi", "哈士奇", "haha"),
	new Emoji("heixian", "黑線", "haha"),
	new Emoji("kouzhao", "口罩", "haha"),
	new Emoji("kulou", "骷髏", "haha"),
	new Emoji("kun", "困", "haha"),
	new Emoji("landelini", "懶得理你", "haha"),
	new Emoji("mao", "貓", "haha"),
	new Emoji("outu", "嘔吐", "haha"),
	new Emoji("qian", "錢", "haha"),
	new Emoji("quantou", "拳頭", "haha"),
	new Emoji("shaoerbuyi", "少兒不宜", "haha"),
	new Emoji("shayan", "傻眼", "haha"),
	new Emoji("shengbing", "生病", "haha"),
	new Emoji("tushetou", "吐舌頭", "haha"),
	new Emoji("shuijiao", "睡覺", "haha"),
	new Emoji("sikao", "思考", "haha"),
	new Emoji("shiwang", "失望", "haha"),
	new Emoji("taikaixin", "太開心", "haha"),
	new Emoji("tear", "流淚", "haha"),
	new Emoji("tianping", "舔屏", "haha"),
	new Emoji("xu", "噓", "haha"),
	new Emoji("youhengheng", "右哼哼", "haha"),
	new Emoji("yun", "暈", "haha"),
	new Emoji("zhouma", "咒罵", "haha"),
	new Emoji("zhuakuang", "抓狂", "haha"),
	new Emoji("zuohengheng", "左哼哼", "haha"),
	new Emoji("zuoyi", "作揖", "haha"),
];

const bilibiliEmoji = [
	new Emoji("baiyan", "白眼", "bilibili", {
		"animation-duration": "1800ms",
		"animation-timing-function": "steps(45)",
		transform: "translateY(-1408px)",
		height: "1440px",
	}),
	new Emoji("fadai", "發呆", "bilibili", {
		"animation-duration": "1080ms",
		"animation-timing-function": "steps(27)",
		transform: "translateY(-832px)",
		height: "864px",
	}),
	new Emoji("koubi", "摳鼻", "bilibili", {
		"animation-duration": "1200ms",
		"animation-timing-function": "steps(30)",
		transform: "translateY(-928px)",
		height: "960px",
	}),
	new Emoji("qinqin", "親親", "bilibili", {
		"animation-duration": "280ms",
		"animation-timing-function": "steps(7)",
		transform: "translateY(-192px)",
		height: "224px",
	}),
	new Emoji("weiqu", "委屈", "bilibili", {
		"animation-duration": "800ms",
		"animation-timing-function": "steps(20)",
		transform: "translateY(-608px)",
		height: "640px",
	}),
	new Emoji("bishi", "鄙視", "bilibili", {
		"animation-duration": "360ms",
		"animation-timing-function": "steps(9)",
		transform: "translateY(-256px)",
		height: "288px",
	}),
	new Emoji("fanu", "發怒", "bilibili", {
		"animation-duration": "1320ms",
		"animation-timing-function": "steps(33)",
		transform: "translateY(-1024px)",
		height: "1056px",
	}),
	new Emoji("kun", "困", "bilibili", {
		"animation-duration": "1760ms",
		"animation-timing-function": "steps(44)",
		transform: "translateY(-1376px)",
		height: "1408px",
	}),
	new Emoji("se", "色", "bilibili", {
		"animation-duration": "400ms",
		"animation-timing-function": "steps(10)",
		transform: "translateY(-288px)",
		height: "320px",
	}),
	new Emoji("weixiao", "微笑", "bilibili", {
		"animation-duration": "800ms",
		"animation-timing-function": "steps(20)",
		transform: "translateY(-608px)",
		height: "640px",
	}),
	new Emoji("bizui", "閉嘴", "bilibili", {
		"animation-duration": "1240ms",
		"animation-timing-function": "steps(31)",
		transform: "translateY(-960px)",
		height: "992px",
	}),
	new Emoji("ganga", "尷尬", "bilibili", {
		"animation-duration": "1520ms",
		"animation-timing-function": "steps(38)",
		transform: "translateY(-1184px)",
		height: "1216px",
	}),
	new Emoji("lengmo", "冷漠", "bilibili", {
		"animation-duration": "40ms",
		"animation-timing-function": "steps(1)",
		transform: "translateY(-0px)",
		height: "32px",
	}),
	new Emoji("shengbing", "生病", "bilibili", {
		"animation-duration": "1400ms",
		"animation-timing-function": "steps(35)",
		transform: "translateY(-1088px)",
		height: "1120px",
	}),
	new Emoji("wunai", "無奈", "bilibili", {
		"animation-duration": "920ms",
		"animation-timing-function": "steps(23)",
		transform: "translateY(-704px)",
		height: "736px",
	}),
	new Emoji("chan", "饞", "bilibili", {
		"animation-duration": "1600ms",
		"animation-timing-function": "steps(40)",
		transform: "translateY(-1248px)",
		height: "1280px",
	}),
	new Emoji("guilian", "鬼臉", "bilibili", {
		"animation-duration": "40ms",
		"animation-timing-function": "steps(1)",
		transform: "translateY(-0px)",
		height: "32px",
	}),
	new Emoji("liubixue", "流鼻血", "bilibili", {
		"animation-duration": "1400ms",
		"animation-timing-function": "steps(35)",
		transform: "translateY(-1088px)",
		height: "1120px",
	}),
	new Emoji("shengqi", "生氣", "bilibili", {
		"animation-duration": "440ms",
		"animation-timing-function": "steps(11)",
		transform: "translateY(-320px)",
		height: "352px",
	}),
	new Emoji("xiaoku", "笑哭", "bilibili", {
		"animation-duration": "600ms",
		"animation-timing-function": "steps(15)",
		transform: "translateY(-448px)",
		height: "480px",
	}),
	new Emoji("daku", "大哭", "bilibili", {
		"animation-duration": "320ms",
		"animation-timing-function": "steps(8)",
		transform: "translateY(-224px)",
		height: "256px",
	}),
	new Emoji("guzhang", "鼓掌", "bilibili", {
		"animation-duration": "680ms",
		"animation-timing-function": "steps(17)",
		transform: "translateY(-512px)",
		height: "544px",
	}),
	new Emoji("liuhan", "流汗", "bilibili", {
		"animation-duration": "1080ms",
		"animation-timing-function": "steps(27)",
		transform: "translateY(-832px)",
		height: "864px",
	}),
	new Emoji("shuizhao", "睡著", "bilibili", {
		"animation-duration": "960ms",
		"animation-timing-function": "steps(24)",
		transform: "translateY(-736px)",
		height: "768px",
	}),
	new Emoji("xieyanxiao", "斜眼笑", "bilibili", {
		"animation-duration": "320ms",
		"animation-timing-function": "steps(8)",
		transform: "translateY(-224px)",
		height: "256px",
	}),
	new Emoji("dalao", "大佬", "bilibili", {
		"animation-duration": "1320ms",
		"animation-timing-function": "steps(33)",
		transform: "translateY(-1024px)",
		height: "1056px",
	}),
	new Emoji("haixiu", "害羞", "bilibili", {
		"animation-duration": "1240ms",
		"animation-timing-function": "steps(31)",
		transform: "translateY(-960px))",
		height: "992px",
	}),
	new Emoji("liulei", "流淚", "bilibili", {
		"animation-duration": "40ms",
		"animation-timing-function": "steps(1)",
		transform: "translateY(-0px)",
		height: "32px",
	}),
	new Emoji("sikao", "思考", "bilibili", {
		"animation-duration": "1440ms",
		"animation-timing-function": "steps(36)",
		transform: "translateY(-1120px)",
		height: "1152px",
	}),
	new Emoji("yiwen", "疑問", "bilibili", {
		"animation-duration": "840ms",
		"animation-timing-function": "steps(21)",
		transform: "translateY(-640px)",
		height: "672px",
	}),
	new Emoji("dalian", "打臉", "bilibili", {
		"animation-duration": "1480ms",
		"animation-timing-function": "steps(37)",
		transform: "translateY(-1152px)",
		height: "1184px",
	}),
	new Emoji("heirenwenhao", "黑人問號", "bilibili", {
		"animation-duration": "1040ms",
		"animation-timing-function": "steps(26)",
		transform: "translateY(-800px)",
		height: "832px",
	}),
	new Emoji("miantian", "靦腆", "bilibili", {
		"animation-duration": "1120ms",
		"animation-timing-function": "steps(28)",
		transform: "translateY(-864px)",
		height: "896px",
	}),
	new Emoji("tiaokan", "調侃", "bilibili", {
		"animation-duration": "40ms",
		"animation-timing-function": "steps(1)",
		transform: "translateY(-0px)",
		height: "32px",
	}),
	new Emoji("yun", "暈", "bilibili", {
		"animation-duration": "480ms",
		"animation-timing-function": "steps(12)",
		transform: "translateY(-352px)",
		height: "384px",
	}),
	new Emoji("dianzan", "點贊", "bilibili", {
		"animation-duration": "800ms",
		"animation-timing-function": "steps(20)",
		transform: "translateY(-608px)",
		height: "640px",
	}),
	new Emoji("huaixiao", "壞笑", "bilibili", {
		"animation-duration": "1240ms",
		"animation-timing-function": "steps(31)",
		transform: "translateY(-960px)",
		height: "992px",
	}),
	new Emoji("mudengkoudai", "目瞪口呆", "bilibili", {
		"animation-duration": "40ms",
		"animation-timing-function": "steps(1)",
		transform: "translateY(-0px)",
		height: "32px",
	}),
	new Emoji("tiaopi", "調皮", "bilibili", {
		"animation-duration": "2000ms",
		"animation-timing-function": "steps(50)",
		transform: "translateY(-1568px)",
		height: "1600px",
	}),
	new Emoji("zaijian", "再見", "bilibili", {
		"animation-duration": "960ms",
		"animation-timing-function": "steps(24)",
		transform: "translateY(-736px)",
		height: "768px",
	}),
	new Emoji("doge", "狗頭", "bilibili", {
		"animation-duration": "800ms",
		"animation-timing-function": "steps(20)",
		transform: "translateY(-608px)",
		height: "640px",
	}),
	new Emoji("jingxia", "驚嚇", "bilibili", {
		"animation-duration": "1280ms",
		"animation-timing-function": "steps(32)",
		transform: "translateY(-992px)",
		height: "1024px",
	}),
	new Emoji("nanguo", "難過", "bilibili", {
		"animation-duration": "1120ms",
		"animation-timing-function": "steps(28)",
		transform: "translateY(-864px)",
		height: "896px",
	}),
	new Emoji("touxiao", "偷笑", "bilibili", {
		"animation-duration": "240ms",
		"animation-timing-function": "steps(6)",
		transform: "translateY(-160px)",
		height: "192px",
	}),
	new Emoji("zhoumei", "皺眉", "bilibili", {
		"animation-duration": "40ms",
		"animation-timing-function": "steps(1)",
		transform: "translateY(-0px)",
		height: "32px",
	}),
	new Emoji("facai", "發財", "bilibili", {
		"animation-duration": "1200ms",
		"animation-timing-function": "steps(30)",
		transform: "translateY(-928px)",
		height: "960px",
	}),
	new Emoji("keai", "可愛", "bilibili", {
		"animation-duration": "680ms",
		"animation-timing-function": "steps(17)",
		transform: "translateY(-512px)",
		height: "544px",
	}),
	new Emoji("outu", "嘔吐", "bilibili", {
		"animation-duration": "1680ms",
		"animation-timing-function": "steps(42)",
		transform: "translateY(-1312px)",
		height: "1344px",
	}),
	new Emoji("tuxue", "吐血", "bilibili", {
		"animation-duration": "320ms",
		"animation-timing-function": "steps(8)",
		transform: "translateY(-224px)",
		height: "256px",
	}),
	new Emoji("zhuakuang", "抓狂", "bilibili", {
		"animation-duration": "760ms",
		"animation-timing-function": "steps(19)",
		transform: "translateY(-576px)",
		height: "608px",
	}),
];

const tiebaEmoji = [
	new Emoji("tongue", "吐舌", "tieba"),
	new Emoji("theblackline", "尷尬", "tieba"),
	new Emoji("tear", "大哭", "tieba"),
	new Emoji("surprised", "驚哭", "tieba"),
	new Emoji("surprised2", "驚訝", "tieba"),
	new Emoji("spray", "噴", "tieba"),
	new Emoji("spit", "嘔吐", "tieba"),
	new Emoji("smilingeyes", "笑眼", "tieba"),
	new Emoji("shui", "睡覺", "tieba"),
	new Emoji("shame", "羞辱", "tieba"),
	new Emoji("se", "色", "tieba"),
	new Emoji("rmb", "錢", "tieba"),
	new Emoji("reluctantly", "勉強", "tieba"),
	new Emoji("rbq", "觀望", "tieba"),
	new Emoji("niconiconi", "愛你", "tieba"),
	new Emoji("naive", "天真", "tieba"),
	new Emoji("ku", "酷", "tieba"),
	new Emoji("huaji", "滑稽", "tieba"),
	new Emoji("hu", "呼", "tieba"),
	new Emoji("han", "汗", "tieba"),
	new Emoji("haha", "哈哈", "tieba"),
	new Emoji("good", "棒", "tieba"),
	new Emoji("doubt", "疑惑", "tieba"),
	new Emoji("britan", "茶", "tieba"),
	new Emoji("bbd", "棒棒噠", "tieba"),
	new Emoji("awesome", "強", "tieba"),
	new Emoji("anger", "憤怒", "tieba"),
	new Emoji("aa", "啊啊", "tieba"),
	new Emoji("happy", "高興", "tieba"),
	new Emoji("grievance", "鬱悶", "tieba"),
];

const menheraEmoji = [
	new Emoji("(⌒▽⌒)", "(⌒▽⌒)", "menhera"),
	new Emoji("(￣▽￣)", "(￣▽￣)", "menhera"),
	new Emoji("(=・ω・=)", "(=・ω・=)", "menhera"),
	new Emoji("(｀・ω・´)", "(｀・ω・´)", "menhera"),
	new Emoji("(〜￣△￣)〜", "(〜￣△￣)〜", "menhera"),
	new Emoji("(･∀･)", "(･∀･)", "menhera"),
	new Emoji("(°∀°)ﾉ", "(°∀°)ﾉ", "menhera"),
	new Emoji("(￣3￣)", "(￣3￣)", "menhera"),
	new Emoji("╮(￣▽￣)╭", "╮(￣▽￣)╭", "menhera"),
	new Emoji("(´_ゝ｀)", "(´_ゝ｀)", "menhera"),
	new Emoji("←_←", "←_←", "menhera"),
	new Emoji("→_→", "→_→", "menhera"),
	new Emoji("(<_<)", "(<_<)", "menhera"),
	new Emoji("(>_>)", "(>_>)", "menhera"),
	new Emoji("(;¬_¬)", "(;¬_¬)", "menhera"),
	new Emoji("(▔□▔)/", "(▔□▔)/", "menhera"),
	new Emoji("(ﾟДﾟ≡ﾟдﾟ)!?", "(ﾟДﾟ≡ﾟдﾟ)!?", "menhera"),
	new Emoji("Σ(ﾟдﾟ;)", "Σ(ﾟдﾟ;)", "menhera"),
	new Emoji("Σ(￣□￣||)", "Σ(￣□￣||)", "menhera"),
	new Emoji("(’；ω；‘)", "(’；ω；‘)", "menhera"),
	new Emoji("（/TДT)/", "（/TДT)/", "menhera"),
	new Emoji("(^・ω・^ )", "(^・ω・^ )", "menhera"),
	new Emoji("(｡･ω･｡)", "(｡･ω･｡)", "menhera"),
	new Emoji("(●￣(ｴ)￣●)", "(●￣(ｴ)￣●)", "menhera"),
	new Emoji("ε=ε=(ノ≧∇≦)ノ", "ε=ε=(ノ≧∇≦)ノ", "menhera"),
	new Emoji("(’･_･‘)", "(’･_･‘)", "menhera"),
	new Emoji("(-_-#)", "(-_-#)", "menhera"),
	new Emoji("（￣へ￣）", "（￣へ￣）", "menhera"),
	new Emoji("(￣ε(#￣)Σ", "(￣ε(#￣)Σ", "menhera"),
	new Emoji("ヽ(‘Д’)ﾉ", "ヽ(‘Д’)ﾉ", "menhera"),
	new Emoji("（#-_-)┯━┯", "（#-_-)┯━┯", "menhera"),
	new Emoji("(╯°口°)╯(┴—┴", "(╯°口°)╯(┴—┴", "menhera"),
	new Emoji("←◡←", "←◡←", "menhera"),
	new Emoji("( ♥д♥)", "( ♥д♥)", "menhera"),
	new Emoji("_(:3」∠)_", "_(:3」∠)_", "menhera"),
	new Emoji("Σ>―(〃°ω°〃)♡→", "Σ>―(〃°ω°〃)♡→", "menhera"),
	new Emoji("⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "menhera"),
	new Emoji("(╬ﾟдﾟ)▄︻┻┳═一", "(╬ﾟдﾟ)▄︻┻┳═一", "menhera"),
	new Emoji("･*･:≡(　ε:)", "･*･:≡(　ε:)", "menhera"),
	new Emoji("(笑)", "(笑)", "menhera"),
	new Emoji("(汗)", "(汗)", "menhera"),
	new Emoji("(泣)", "(泣)", "menhera"),
	new Emoji("(苦笑)", "(苦笑)", "menhera"),
];

const emojiData = [
	...hahaEmoji,
	...bilibiliEmoji,
	...tiebaEmoji,
	...menheraEmoji,
];

var Utils = {
	_version: "1.0.0",
	/**
   * 是否移動裝置
   */
	isMobile() {
		if (
			navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
		)
			return true;
		return false;
	},
	/**
   * time ago
   * @param {*} time
   */
	timeAgo(time) {
		if (!time) return "未知時間";
		time = new Date(time).getTime();
		var currentTime = new Date().getTime();
		var between = currentTime - time;
		var days = Math.floor(between / (24 * 3600 * 1000));
		if (days === 0) {
			var leave1 = between % (24 * 3600 * 1000);
			var hours = Math.floor(leave1 / (3600 * 1000));
			if (hours === 0) {
				var leave2 = leave1 % (3600 * 1000);
				var minutes = Math.floor(leave2 / (60 * 1000));
				if (minutes === 0) {
					var leave3 = leave2 % (60 * 1000);
					var seconds = Math.round(leave3 / 1000);
					if (seconds < 1) return "剛剛";
					return seconds + " 秒前";
				}
				return minutes + " 分鐘前";
			}
			// return Utils.formatDate(time, "今天 hh:mm");
			return hours + " 小時前";
		}
		if (days < 0) return "剛剛";
		// if (days < 1) {
		//   return days + " 天前";
		// } else {
		//   return Utils.formatDate(time, "yyyy年MM月dd日 hh:mm");
		// }
		if (days === 1) {
			return "昨天";
		} else {
			return Utils.formatDate(time, "yyyy年MM月dd日 hh:mm");
		}
	},
	/**
   * 時間格式化
   * @param {*} time
   */
	formatDate(date, fmt = "yyyy-MM-dd") {
		date = new Date(date);
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				(date.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		}
		let o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate(),
			"h+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds(),
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + "";
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ? str : str.padStart(2, "0")
				);
			}
		}
		return fmt;
	},
	/**
   * 獲取當前瀏覽器語言
   * 使用當前方法，只會得到語言前兩個字元
   * @return zh、cn 等
   */
	getNavLangSub() {
		var currentLang = navigator.language;
		// 只獲取前兩個字元
		currentLang = currentLang.substr(0, 2);
		//判斷IE瀏覽器使用語言
		if (!currentLang) {
			currentLang = navigator.browserLanguage;
		}
		return currentLang;
	},
	/* 獲取URL中帶的連結引數
   * @param search 連結字尾
   * @return {{}} 物件
   */
	getUrlParams() {
		var search = location.search;

		// 判斷是否為字串型別
		if (typeof search !== "string") {
			search = search.toString();
		}

		var paramsSplit = search.replace(/^[^\?]*\?/i, "").split(/&/);
		var params = {};

		// 資料為空
		if (paramsSplit.length < 1) {
			return params;
		}

		if (Array.isArray(paramsSplit)) {
			paramsSplit.forEach(function (item) {
				// 資料為空, 退出方法
				if (!item) {
					return false;
				}
				var itemSplit = item.split(/=/);

				// 判斷字串中是否有多個=
				if (itemSplit.length >= 2) {
					// 是
					var key = itemSplit.splice(0, 1);
					params[key] = itemSplit.join("=");
				}
			});
		}
		return params;
	},
	/* 請求封裝 */
	request({
		url = "",
		method = "GET",
		data,
		headers = {},
		timeout = 10000,
		returnRaw = false,
	}) {
		return new Promise((resolve, reject) => {
			method = method.toUpperCase();
			$.ajax({
				url: `${url}${method === "GET" ? `${url.indexOf("?")===-1?"?":"&"}_r=${Date.now()}` : ""}`,
				type: method,
				headers: {
					"API-Authorization": ThemeConfig.access_key || "joe2.0",
					...headers,
				},
				async: true,
				dataType: "json",
				timeout,
				data,
				success(res) {
					if (returnRaw) {
						resolve(res);
					} else {
						if (res.status === 200) {
							resolve(res.data || "");
						} else {
							reject(res);
						}
					}
				},
				error(err) {
					const errMsg = err
						? err.responseJSON
							? err.responseJSON.message
							: "出錯了！"
						: "出錯了！";
					Qmsg.error(errMsg);
					reject(errMsg);
				},
			});
		});
	},
	/* throttle */
	throttle(fn, threshold = 250) {
		let timer;
		let last;
		return function () {
			const context = this;
			const args = [...arguments];
			const now = Date.now();
			if (last && last + threshold > now) {
				clearTimeout(timer);
				timer = null;
				timer = setTimeout(() => {
					last = now;
					fn.apply(context, args);
				}, threshold);
			} else {
				last = now;
				fn.apply(context, args);
			}
		};
	},
	/* sleep */
	sleep(ms = 250) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	},
	/**
   * 儲存資料到瀏覽器的 cookie 內
   * 不建議向 cookie 記憶體入大量資料，如果有大資料需求的話
   * 或許可以考慮 {@link Util#setLocalStorageByJSON}
   * @param {String} key 需要儲存的 key
   * @param {String} value 需要儲存在 cookie 內的值
   * @param {Number} days 儲存時間。單位/天。不輸入則為永久儲存
   */
	setCookie(key, value, days) {
		var keyVE = key + Utils._version,
			expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = keyVE + "=" + (value || "") + expires + "; path=/";
	},

	/**
   * 獲取儲存在瀏覽器 cookie 內的資料
   * @param {String} key
   * @return 如果沒能獲取到資料，則返回 null。否則，返回目標資料字串
   */
	getCookie(key) {
		var keyVE = key + Utils._version + "=";
		var ca = document.cookie.split(";");

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(keyVE) == 0) return c.substring(keyVE.length, c.length);
		}

		return null;
	},

	/**
   * 刪除儲存在瀏覽器 cookie 內的資料
   * @param {String} key 需要刪除的 key
   */
	removeCookie(key) {
		var keyVE = key + Utils._version + "=";

		document.cookie = keyVE + "=; Max-Age=-99999999;";
	},

	/**
   * 儲存 JSON 資料到瀏覽器的 localstorage 裡
   * 當前方法不支援永久儲存
   * @param {String} key 需要儲存的 key
   * @param {JSON} value 需要儲存的JSON資料
   * @param {Number} expires 儲存時間。單位/秒。【預設 3600秒（一小時）】
   */
	setLocalStorage(key, value, expires = 3600) {
		var keyVE = key + Utils._version;
		var date = new Date();

		try {
			localStorage.setItem(
				keyVE,
				JSON.stringify({
					expires: date.valueOf() + expires * 1000,
					data: value,
				})
			);
		} catch (e) {
			if (e.name === "QuotaExceededError") {
				console.log("資料已滿，自動清空");
				localStorage.clear();
				setLocalStorage(key, value, expires);
			}
		}
	},

	/**
   * 根據 key 獲取儲存在 localstorage 內的 JSON 資料【KEY 會自動加上 util 的版本號】
   * @param {String} key 需要讀取資料的 key
   * @return 返回 JSON 格式的資料，如果不存在或者過期了，則返回 null
   */
	getLocalStorage(key) {
		var keyVE = key + Utils._version;

		var result = JSON.parse(localStorage.getItem(keyVE));
		var date = new Date();
		if (result && result.expires > date) {
			return result.data;
		} else {
			localStorage.removeItem(keyVE);
			return null;
		}
	},

	/**
   * 刪除儲存在 localStorage 中的資料
   * @param {*} key 需要刪除的 key【會自動加上 util 的版本號】
   */
	removeLocalStorage(key) {
		var keyVE = key + Utils._version;

		localStorage.removeItem(keyVE);
	},

	/**
   * 非同步載入 JS
   * @param {*} url 需要載入 JS 地址
   * @param {*} callback 載入完成回撥
   */
	loadJS(url, callback) {
		Utils._loadRes("script", url, callback);
	},

	/**
   * 非同步載入 CSS
   * @param {*} url 需要載入的 CSS 地址
   * @param {*} callback 載入完成回撥
   */
	loadCSS(url, callback) {
		Utils._loadRes("link", url, callback);
	},

	/**
   * 非同步載入資源 *私有方法（不建議直接呼叫）*
   * @param {*} type 當前需要載入的資源型別
   * @param {*} url 資源 連結地址
   * @param {*} callback 載入完成回撥函式
   */
	_loadRes(type, url, callback) {
		var dom,
			fn = callback || function () {};
		switch (type) {
		case "script":
			dom = document.createElement(type);
			dom.type = "text/javascript";
			dom.src = url;
			break;
		case "link":
			dom = document.createElement(type);
			dom.type = "text/css";
			dom.type = "stylesheet";
			dom.href = url;
			break;
		default:
			console.warn("暫不支援：" + type + " 型別");
			return;
		}
		//IE
		if (dom.readyState) {
			dom.onreadystatechange = function () {
				if (dom.readyState == "loaded" || dom.readyState == "complete") {
					dom.onreadystatechange = null;
					fn();
				}
			};
		} else {
			//其他瀏覽器
			dom.onload = function () {
				fn();
			};
		}

		var head = document.getElementsByTagName("head")[0];
		head.appendChild(dom);
	},

	/**
   * 獲取隨機顏色值
   * 當獲取的值越小，色調越偏冷
   * @param {Number} min 色調值，0 - 1 之間的值
   * @param {Number} max 色調值，需要大於min且為0 - 1之間的值
   */
	getRandomColor(min = 0, max = 1) {
		if (!min) {
			min = 0;
		}
		if (!max) {
			max = 0;
		}
		min = isNaN(min) ? 0 : Number(min);
		max = isNaN(max) ? 1 : Number(max);
		min = Math.min(Math.max(Math.abs(min), 0), 1);
		max = Math.min(Math.max(Math.abs(max), 0), 1);
		max = max < min ? 1 : max;
		return (
			"#" +
      (function (h) {
      	return new Array(7 - h.length).join("0") + h;
      })((((Math.random() * (max - min) + min) * 0x1000000) << 0).toString(16))
		);
	},
	/**
   * 刪除元素的 class，可根據字首來刪除
   * @param {*} el 需要刪除的 dom 元素
   * @param {*} prefix 需要刪除的 class，可以僅為字首
   */
	removeClassByPrefix(el, prefix) {
		const classes = el.className.split(" ").filter(function (c) {
			return c.lastIndexOf(prefix, 0) !== 0;
		});

		el.className = classes.join(" ").trim();
	},
	/**
   * 渲染表情包
   */
	renderedEmojiHtml(html) {
		const parser = new DOMParser();
		const doc = Utils.removeNotEmoji(parser.parseFromString(html, "text/html"));
		// const emotions = doc.getElementsByClassName("emoji-animate");
		// for (let i = 0; i < emotions.length; i++) {
		// 	const emojiName = emotions[i].getAttribute("data-icon");
		// 	for (let j = 0; j < emojiData.length; j++) {
		// 		const emoji = emojiData[j];
		// 		if (emoji.style && emoji.name === emojiName) {
		// 			const emoji = emojiData[j];
		// 			const img = emotions[i].getElementsByClassName("img")[0];
		// 			let dataStyle = "";
		// 			Object.keys(emoji.style).forEach(function (item) {
		// 				dataStyle += item + ":" + emoji.style[item] + ";";
		// 			});
		// 			img.style.cssText = dataStyle;
		// 			break;
		// 		}
		// 	}
		// }
		return doc.body.innerHTML;
	},
	trimTailBr(str) {
		return str.replace(/((\s|&nbsp;)*\r?\n)+$/g, "");
	},
	limitBr(str) {
		// return str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, "\r\n\r\n");
		return str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, "");
	},
	trimHeadBr(str) {
		return str.replace(/^((\s|&nbsp;)*\r?\n)+/g, "");
	},
	/**
   * 判斷需要渲染的 HTML 是否屬於表情包，如果不屬於，則去除此 HTML，僅保留文字
   */
	removeNotEmoji(doc) {
		const smilies = doc.getElementsByClassName("emoji-img");
		let skip = true;

		for (let i = 0; i < smilies.length; i++) {
			const name = smilies[i].dataset.icon;

			if (!Utils.findEmoji("tieba", name) && !Utils.findEmoji("haha", name)) {
				skip = false;
				break;
			}
		}

		if (skip) {
			return doc;
		}

		const firstNode = smilies[0];
		const name = firstNode.dataset.icon;

		if (!Utils.findEmoji("tieba", name) && !Utils.findEmoji("haha", name)) {
			Utils.removeNode(firstNode);
		}

		return Utils.removeNotEmoji(doc);
	},
	removeNode(node) {
		const alt = node.getAttribute("alt");
		const textNode = document.createTextNode(alt);
		node.parentNode.replaceChild(textNode, node);
	},
	/**
   * 根據條件查詢表情
   * @param {*} type
   * @param {*} name
   * @returns 返回 true 則表示表情存在，返回 false 則表示不存在
   */
	findEmoji(type, name) {
		return (
			emojiData.filter((item) => item.category === type && item.name === name)
				.length > 0
		);
	},
	return2Br(str) {
		str = Utils.trimHeadBr(str);
		str = Utils.trimTailBr(str);
		str = Utils.limitBr(str);
		// return str.replace(/\r?\n/g, "<br />");
		return str;
	},
};

window.Utils = Utils;
