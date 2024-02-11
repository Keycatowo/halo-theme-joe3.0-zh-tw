// 更新主題版本號
const fs = require("fs");
const { EOL } = require("os");
const { version } = require("../../package.json");

const updateThemeVersion = () => {
	const filePath = "theme.yaml";
	const source = fs.readFileSync(filePath, "utf8");
	if (source.indexOf(version) > -1) {
		// 版本相同則跳過
		console.log(`版本號 ${version} 已經是最新的了`);
		return;
	}
	const data = source.split(/\r?\n/gm);
	let pos_index = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].includes("version:")) {
			pos_index = i;
			break;
		}
	}
	data.splice(pos_index, 1);
	data.splice(pos_index, null, `version: ${version}`);
	fs.writeFileSync(filePath, data.join(EOL));
	console.log(`版本號 ${version} 更新成功`);
};

updateThemeVersion();
