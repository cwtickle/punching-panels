'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [for Punching◇Panels]
 * 
 * Source by tickle
 * Created: 2022/01/28
 * Revised:
 * Source Version: Ver 1.0.0
 * 
 * https://github.com/cwtickle/punching-panels
 */

// 位置の設定、ゲーム名の変更
const jstyleX = [100, 200, 300, 400, 500, 150, 250, 350, 450, 150, 250, 350, 450, 100, 200, 300, 400, 500];
const jstyleY = [110, 110, 110, 110, 110, 170, 170, 170, 170, 230, 230, 230, 230, 290, 290, 290, 290, 290];
g_lblNameObj.dancing = `PUNCHING`;
g_lblNameObj.star = `◇`;
g_lblNameObj.onigiri = `PANELS`;
g_lblNameObj[`u_key`] = `panel`;
g_lblNameObj[`u_k-`] = `p-`;

// ステップゾーンの位置変更 (ノーツはCSS側で制御)
function pstyleMainInit() {
	if ([`18p`].includes(g_keyObj.currentKey)) {
		const rev = g_stateObj.reverse;
		for (let i = 0; i < 18; i++) {
			if (document.getElementById(`stepRoot${i}`)) {
				document.getElementById(`stepRoot${i}`).style.left = `${jstyleX[i]}px`;
				document.getElementById(`stepRoot${i}`).style.top = `${jstyleY[i]}px`;
			}
		}
	}
}
g_customJsObj.main.push(pstyleMainInit);

