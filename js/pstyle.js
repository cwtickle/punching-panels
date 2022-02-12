'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [for Punching◇Panels]
 * 
 * Source by tickle
 * Created: 2022/01/28
 * Revised: 2022/02/12
 * Source Version: Ver 1.2.0
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

// カスタムキー定義
g_keyObj.keyName18p = `18`;
g_keyObj.chara18p_0 = [`aa`, `ab`, `ac`, `ad`, `ae`, `ba`, `bb`, `bc`, `bd`, `ca`, `cb`, `cc`, `cd`, `da`, `db`, `dc`, `dd`, `de`];
g_keyObj.chara18p_1 = [`aa`, `ab`, `ac`, `ad`, `ae`, `ba`, `bb`, `bc`, `bd`, `ca`, `cb`, `cc`, `cd`, `da`, `db`, `dc`, `dd`, `de`];
g_keyObj.color18p_0_0 = [0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4];
g_keyObj.color18p_1_0 = [0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4];
g_keyObj.shuffle18p_0_0 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3];
g_keyObj.shuffle18p_0_1 = [0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4];
g_keyObj.shuffle18p_0_2 = [0, 1, 2, 3, 4, 0, 1, 3, 4, 4, 3, 1, 0, 4, 3, 2, 1, 0];
g_keyObj.shuffle18p_1_0 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3];
g_keyObj.shuffle18p_1_1 = [0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4];
g_keyObj.shuffle18p_1_2 = [0, 1, 2, 3, 4, 0, 1, 3, 4, 4, 3, 1, 0, 4, 3, 2, 1, 0];
g_keyObj.stepRtn18p_0 = [`c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`];
g_keyObj.stepRtn18p_1 = [`c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`, `c`];
g_keyObj.pos18p_0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
g_keyObj.pos18p_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
g_keyObj.keyCtrl18p_0 = [[55, 0], [56, 0], [57, 0], [48, 0], [189, 0], [85, 0], [73, 0], [79, 0], [80, 0], [74, 0], [75, 0], [76, 0], [187, 0], [78, 0], [77, 0], [188, 0], [190, 0], [191, 0]];
g_keyObj.keyCtrl18p_1 = [[50, 0], [51, 0], [52, 0], [53, 0], [54, 0], [87, 0], [69, 0], [82, 0], [84, 0], [83, 0], [68, 0], [70, 0], [71, 0], [90, 0], [88, 0], [67, 0], [86, 0], [66, 0]];
g_keyObj.div18p_0 = 18;
g_keyObj.div18p_1 = 18;

// デフォルト配列のコピー (g_keyObj.aaa_X から g_keyObj.aaa_Xd を作成)
const keyCtrlNameP = Object.keys(g_keyObj).filter(val => val.startsWith(`keyCtrl18p`));
keyCtrlNameP.forEach(property => g_keyObj[`${property}d`] = copyArray2d(g_keyObj[property]));

[`color18p`, `shuffle18p`].forEach(type => {
	const tmpName = Object.keys(g_keyObj).filter(val => val.startsWith(type) && val.endsWith(`_0`));
	tmpName.forEach(property => g_keyObj[`${property.slice(0, -2)}`] = g_keyObj[property].concat());
});

// 矢印モーション初期定義
g_rootObj.arrowMotion_data = `
0,0,j11,j11
0,1,j12,j12
0,2,j13,j13
0,3,j14,j14
0,4,j15,j15
0,5,j21,j21
0,6,j22,j22
0,7,j23,j23
0,8,j24,j24
0,9,j31,j31
0,10,j32,j32
0,11,j33,j33
0,12,j34,j34
0,13,j41,j41
0,14,j42,j42
0,15,j43,j43
0,16,j44,j44
0,17,j45,j45
`;

// 一部設定を上書きするための設定
if (typeof g_lblRenames !== C_TYP_OBJECT) {
	var g_lblRenames = {
		option: true,
		settingsDisplay: true,
		main: true,
		keyConfig: true,
		result: true,
	};
}

// ステップゾーンの位置変更 (ノーツはCSS側で制御)
function pstyleMainInit() {
	if ([`18p`].includes(g_keyObj.currentKey)) {
		for (let i = 0; i < 18; i++) {
			if (document.getElementById(`stepRoot${i}`)) {
				document.getElementById(`stepRoot${i}`).style.left = `${jstyleX[i]}px`;
				document.getElementById(`stepRoot${i}`).style.top = `${jstyleY[i]}px`;
			}
		}
	}
}
g_customJsObj.main.push(pstyleMainInit);

// ライセンス原文、以下は削除しないでください
/*-----------------------------------------------------------*/
/*
MIT License

Copyright (c) 2022 tickle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*-----------------------------------------------------------*/