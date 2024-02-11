/**文章頁邏輯 */
const postContext = {
	limited: false,
	/* 初始化評論後可見 */
	// initReadLimit() {
	// 	if (
	// 		PageAttrs.metas_enable_read_limit &&
	// 		PageAttrs.metas_enable_read_limit.trim() !== "true"
	// 	)
	// 		return;
	// 	postContext.limited = true;
	// 	const $article = $(".page-post .joe_detail__article");
	// 	const $content = $("#post-inner");
	// 	const $hideMark = $(".page-post .joe_read_limited");
	// 	const clientHeight =
	// 		document.documentElement.clientHeight || document.body.clientHeight;
	// 	const cid = $(".joe_detail").attr("data-cid");
	//
	// 	// 移除限制
	// 	const removeLimit = () => {
	// 		postContext.limited = false;
	// 		$hideMark.parent().remove();
	// 		$article.removeClass("limited");
	// 		postContext.initToc(true); // 重新渲染TOC
	// 	};
	//
	// 	// 如果文章內容高度小於等於螢幕高度，則自動忽略限制
	// 	if ($content.height() < clientHeight + 180) {
	// 		removeLimit();
	// 		return;
	// 	}
	//
	// 	// 檢查本地的 partialIds
	// 	const checkPartialIds = (postId, cb) => {
	// 		const localIds = localStorage.getItem("partialIds");
	// 		if (localIds && localIds.includes(postId)) {
	// 			// console.log("已經評論過了");
	// 			removeLimit(); // 移除限制
	// 		} else {
	// 			cb && cb();
	// 		}
	// 	};
	//
	// 	// 更新當前評論狀態
	// 	const updateState = async () => {
	// 		// console.log("評論成功，更新狀態");
	// 		const scrollTop = $hideMark.offset().top - 180;
	// 		const localIds = localStorage.getItem("partialIds");
	//
	// 		await Utils.sleep(800); // 延遲一下
	// 		removeLimit(); // 移除限制
	// 		localStorage.setItem("partialIds", localIds ? localIds + "," + cid : cid); // 記錄id
	// 		Qmsg.success("感謝您的支援");
	//
	// 		// 滾動到原位置
	// 		$("html,body").animate(
	// 			{
	// 				scrollTop,
	// 			},
	// 			500
	// 		);
	// 	};
	//
	// 	// 監聽評論成功事件（區分首次和後續提交）
	// 	const handleCallback = () => {
	// 		// console.log("沒有評論記錄");
	// 		const commentNode = document.getElementsByTagName("halo-comment")[0];
	// 		commentNode.addEventListener("post-success", (_data) => {
	// 			// console.log(_data, "評論成功");
	// 			// 檢查是否已經評論過該文章
	// 			checkPartialIds(cid, updateState);
	// 		});
	// 	};
	//
	// 	checkPartialIds(cid, handleCallback);
	// },
	/* 文章複製 + 版權文字 */
	initCopy() {
		if (PageAttrs.metas_enable_copy === "false" || !ThemeConfig.enable_copy)
			return;
		const curl = location.href;
		const author = $(".joe_detail").attr("data-author");
		$(".joe_detail__article").on("copy", function (e) {
			const selection = window.getSelection();
			const selectionText = selection.toString().replace(/<已自動摺疊>/g, "");
			const appendLink = ThemeConfig.enable_copy_right_text
				? ThemeConfig.copy_right_text ||
				`\r\n\r\n====================================\r\n文章作者： ${author}\r\n文章來源： ${ThemeConfig.blog_title}\r\n文章連結： ${curl}\r\n版權宣告： 內容遵循 CC 4.0 BY-SA 版權協議，轉載請附上原文出處連結及本宣告。`
				: "";
			if (window.clipboardData) {
				const copytext = selectionText + appendLink;
				window.clipboardData.setData("Text", copytext);
				return false;
			} else {
				const body_element = document.body;
				const copytext = selectionText + appendLink;
				const newdiv = document.createElement("pre");
				newdiv.style.position = "absolute";
				newdiv.style.left = "-99999px";
				body_element.appendChild(newdiv);
				newdiv.innerText = copytext;
				selection.selectAllChildren(newdiv);
				setTimeout(function () {
					body_element.removeChild(newdiv);
				}, 0);
			}
		});
	},
	/* 初始化文章分享 */
	initShare() {
		if (PageAttrs.metas_enable_share === "false" || !ThemeConfig.enable_share)
			return;
		if (ThemeConfig.enable_share_link && $(".icon-share-link").length) {
			$(".icon-share-link").each((_index, item) => {
				new ClipboardJS($(item)[0], {
					text: () => location.href,
				}).on("success", () => Qmsg.success("文章連結已複製"));
			});
		}
		if (ThemeConfig.enable_share_weixin && $(".qrcode_wx").length) {
			$(".qrcode_wx").qrcode({
				width: 140,
				height: 140,
				render: "canvas",
				typeNumber: -1,
				correctLevel: 0,
				background: "#ffffff",
				foreground: "#000000",
				text: location.href,
			});
		}
	},
	/* 文章點贊 */
	initLike() {
		if (
			PageAttrs.metas_enable_like === "false" ||
			!ThemeConfig.enable_like ||
			!$(".joe_detail__agree").length
		)
			return;
		const cid = $(".joe_detail").attr("data-cid");
		const clikes = +($(".joe_detail").attr("data-clikes") || 0);
		let agreeArr = localStorage.getItem(encryption("agree"))
			? JSON.parse(decrypt(localStorage.getItem(encryption("agree"))))
			: [];
		let flag = agreeArr.includes(cid);
		const $icons = $(".joe_detail__agree, .post-operate-like");
		const $iconLike = $icons.find(".icon-like");
		const $iconUnlike = $icons.find(".icon-unlike");
		const $likeNum = $icons.find(".nums");
		if (flag) {
			$iconUnlike.addClass("active");
		} else {
			$iconLike.addClass("active");
		}
		$likeNum.html(clikes);
		let _loading = false;
		$iconLike.on("click", function (e) {
			e.stopPropagation();
			if (_loading) return;
			_loading = true;
			agreeArr = localStorage.getItem(encryption("agree"))
				? JSON.parse(decrypt(localStorage.getItem(encryption("agree"))))
				: [];
			flag = agreeArr.includes(cid);
			// console.log(cid)

			$.ajax({
				url: "/apis/api.halo.run/v1alpha1/trackers/upvote",
				type: "post",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					group: "content.halo.run",
					plural: "posts",
					name: cid,
				}),
			})
				.then((_res) => {
					let likes = clikes;
					if (flag) {
						likes--;
						const index = agreeArr.findIndex((_) => _ === cid);
						agreeArr.splice(index, 1);
						$iconUnlike.removeClass("active");
						$iconLike.addClass("active");
						$icons.removeClass("active");
					} else {
						likes++;
						agreeArr.push(cid);
						$iconLike.removeClass("active");
						$iconUnlike.addClass("active");
						$icons.addClass("active");
					}
					const name = encryption("agree");
					const val = encryption(JSON.stringify(agreeArr));
					localStorage.setItem(name, val);
					$likeNum.html(likes).show();
				})
				.catch((err) => {
					_loading = false;
				});
		});
	},
	/* 文章目錄 */
	initToc(reload) {
		if (
			PageAttrs.metas_enable_toc === "false" ||
			!ThemeConfig.enable_toc ||
			!$(".toc-container").length
		)
			return;

		// 原始內容的文章不支援TOC
		if (PageAttrs.metas_use_raw_content === "true") {
			$("#js-toc").html(
				"<div class=\"toc-nodata\">暫不支援解析原始內容目錄</div>"
			);
			$(".toc-container").show();
			return;
		}

		// 回覆可見的文章首次不渲染TOC
		if (
			PageAttrs.metas_enable_read_limit === "true" &&
			!reload &&
			postContext.limited
		) {
			$("#js-toc").html(
				"<div class=\"toc-nodata\">文章內容不完整，目錄僅評論後可見</div>"
			);
			$(".toc-container").show();
			return;
		}

		// 渲染TOC&處理相關互動
		const $html = $("html");
		const $mask = $(".joe_header__mask");
		const $btn_mobile_toc = $(".joe_action .toc");
		const $mobile_toc = $(".joe_header__toc");
		const $tocContainer = $("#js-toc");
		const $tocMobileContainer = $("#js-toc-mobile");

		// 初始化TOC
		tocbot.init({
			tocSelector: Joe.isMobile ? "#js-toc-mobile" : "#js-toc",
			contentSelector: ".joe_detail__article",
			ignoreSelector: ".js-toc-ignore",
			headingSelector: "h1,h2,h3,h4,h5,h6",
			collapseDepth: +(PageAttrs.metas_toc_depth || ThemeConfig.toc_depth || 0),
			scrollSmooth: true,
			includeTitleTags: true,
			// scrollSmoothDuration: 400,
			hasInnerContainers: false,
			headingsOffset: 80, // 目錄中高亮的偏移值，和scrollSmoothOffset有關聯
			scrollSmoothOffset: -80, // 螢幕滾動的偏移值（這裡和導航條固定也有關聯）
			positionFixedSelector: ".toc-container", // 固定類新增的容器
			positionFixedClass: "is-position-fixed", // 固定類名稱
			fixedSidebarOffset: "auto",
			// disableTocScrollSync: false,
			onClick: function (e) {
				// console.log(e);
				if (Joe.isMobile) {
					// 更新移動端toc文章滾動位置
					$html.removeClass("disable-scroll");
					$mobile_toc.removeClass("active");
					$mask.removeClass("active slideout");
					// if (location.hash) {
					// 	$("html,body").animate(
					// 		{
					// 			scrollTop: $(decodeURIComponent(location.hash)).offset().top,
					// 		},
					// 		0
					// 	);
					// }
				}

				window.tocPhase = true;
			},
			scrollEndCallback: function (e) {
				// console.log(e);
				window.tocPhase = null;
			},
		});

		// 無選單資料
		if (Joe.isMobile) {
			!$tocMobileContainer.children().length &&
			$tocMobileContainer.html(
				"<div class=\"toc-nodata\"><em></em>暫無目錄</div>"
			);
		} else {
			!$tocContainer.children().length &&
			$tocContainer.html("<div class=\"toc-nodata\">暫無目錄</div>");
		}

		// 移動端toc選單互動
		if (Joe.isMobile) {
			$btn_mobile_toc.show();
			$btn_mobile_toc.on("click", () => {
				window.sessionStorage.setItem("lastScroll", $html.scrollTop());
				$html.addClass("disable-scroll");
				$mask.addClass("active slideout");
				$mobile_toc.addClass("active");
			});
		}

		$(".toc-container").show();
	},
	/**初始化左側工具條 */
	initAsideOperate() {
		// 評論
		$(".post-operate-comment").on("click", function (e) {
			const $comment = document.querySelector(".joe_comment");
			const $header = document.querySelector(".joe_header");
			if (!$comment || !$header) return;
			e.stopPropagation();
			if (!Boolean(document.querySelector('[id*="comment-"]'))&& !Boolean(document.querySelector("#waline"))) {
				Qmsg.warning("評論功能不可用！");
				return;
			}
			const top = $comment.offsetTop - $header.offsetHeight - 15;
			window.scrollTo({ top });
		});

		// 判斷是否需要隱藏選單
		if (Joe.isMobile) return;
		const $asideEl = $(".aside_operations");
		const $operateEl = $(
			".joe_detail__agree,.joe_detail__operate-share,.joe_detail__operate .joe_donate"
		);
		const toggleAsideMenu = (e) => {
			const offsetLeft = $(".joe_post")[0].getBoundingClientRect().left;
			if (offsetLeft < 75) {
				$asideEl.hide();
				$operateEl.show();
			} else {
				$asideEl.show();
				$operateEl.hide();
			}
		};
		toggleAsideMenu();
		window.addEventListener("resize", Utils.throttle(toggleAsideMenu), 500);
	},
	/* 閱讀進度條 */
	initProgress() {
		if (!ThemeConfig.enable_progress_bar) return;
		$(window).off("scroll");
		const progress_bar = $(".joe_progress_bar");
		let win_h, body_h, sHeight;
		const updateProgress = (p) => progress_bar.css("width", p * 100 + "%");
		$(window).on("scroll", function (e) {
			e.stopPropagation();
			win_h = $(window).height();
			body_h = $("body").height();
			sHeight = body_h - win_h;
			window.requestAnimationFrame(function () {
				const perc = Math.max(0, Math.min(1, $(window).scrollTop() / sHeight));
				updateProgress(perc);
			});
		});
	},
	/* 文章影片模組 */
	initVideo() {
		if ($(".joe_detail__article-video").length) {
			const player = $(".joe_detail__article-video .play iframe").attr(
				"data-player"
			);
			$(".joe_detail__article-video .episodes .item").on("click", function (e) {
				e.stopPropagation();
				$(this).addClass("active").siblings().removeClass("active");
				const url = $(this).attr("data-src");
				$(".joe_detail__article-video .play iframe").attr({
					src: player + url,
				});
			});
			$(".joe_detail__article-video .episodes .item").first().click();
		}
	},
	/*跳轉到指定評論 */
	async jumpToComment() {
		if (
			ThemeConfig.enable_clean_mode ||
			!ThemeConfig.enable_comment ||
			PageAttrs.metas_enable_comment === "false"
		)
			return;
		const { cid: commentId = "", p: postId = "" } = Utils.getUrlParams();
		if (!commentId) return;
		await Utils.sleep(1000);
		try {
			const commentEl = document.getElementsByTagName("halo-comment");
			if (!commentEl) return;
			const el = $(commentEl[0].shadowRoot.getElementById("halo-comment")).find(
				"#comment-" + commentId
			);
			if (!el) return;
			const offsetTop = el.offset().top - 50;
			// 滾動到指定位置
			window.scrollTo({ top: offsetTop });
			// 高亮該評論元素
			const el_comment = el.find(".markdown-content").eq(0);
			el_comment.addClass("blink");
			await Utils.sleep(2000);
			el_comment.removeClass("blink");
			// 清除url引數
			window.history.replaceState(
				null,
				null,
				postId ? `?p=${postId}` : location.origin + location.pathname
			);
			tocbot.refresh();
		} catch (error) {
			console.info(error);
		}
	},
	/* TODO:密碼保護文章，輸入密碼訪問 */
	// initArticleProtect() {
	//   const cid = $(".joe_detail").attr("data-cid");
	//   let isSubmit = false;
	//   $(".joe_detail__article-protected").on("submit", function (e) {
	//     e.preventDefault();
	//     const url = $(this).attr("action") + "&time=" + new Date();
	//     const protectPassword = $(this).find("input[type=\"password\"]").val();
	//     if (protectPassword.trim() === "") return Qmsg.info("請輸入訪問密碼！");
	//     if (isSubmit) return;
	//     isSubmit = true;

	// 		Utils.request({
	// 			url: url,
	// 			method: "POST",
	// 			data: {
	//     			cid,
	//     			protectCID: cid,
	//     			protectPassword,
	//     		}
	// 		})
	// 			.then((_res) => {
	//         let arr = [],
	//           str = "";
	//         arr = $(res).contents();
	//         Array.from(arr).forEach((_) => {
	//           if (_.parentNode.className === "container") str = _;
	//         });
	//         if (!/Joe/.test(res)) {
	//           Qmsg.warning(str.textContent.trim() || "");
	//           isSubmit = false;
	//           $(".joe_comment__respond-form .foot .submit button").html(
	//             "發表評論"
	//           );
	//         } else {
	//           location.reload();
	//         }
	//       }).catch(err=>{
	// 				isSubmit = false;
	// 			});
	//   });
	// },
};

!(function () {
	const omits = ["jumpToComment"];
	document.addEventListener("DOMContentLoaded", function () {
		Object.keys(postContext).forEach(
			(c) =>
				!omits.includes(c) &&
				typeof postContext[c] === "function" &&
				postContext[c]()
		);
	});

	window.addEventListener("load", function () {
		if (omits.length === 1) {
			postContext[omits[0]]();
		} else {
			omits.forEach(
				(c) => c !== "loadingBar" && postContext[c] && postContext[c]()
			);
		}
	});
})();
