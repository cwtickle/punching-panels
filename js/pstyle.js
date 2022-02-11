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

// カスタムキー定義
const pkeyData = `
|keyExtraList=18p|
|keyName18p=18|
|chara18p=aa,ab,ac,ad,ae,ba,bb,bc,bd,ca,cb,cc,cd,da,db,dc,dd,de$18p_0|
|color18p=0,1,2,3,4,0,1,3,4,0,1,3,4,0,1,2,3,4$18p_0|
|shuffle18p=0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,3$18p_0|
|stepRtn18p=c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c$18p_0|
|pos18p=0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17$18p_0|
|keyCtrl18p=55/0,56/0,57/0,48/0,189/0,85/0,73/0,79/0,80/0,74/0,75/0,76/0,187/0,78/0,77/0,188/0,190/0,191/0$50/0,51/0,52/0,53/0,54/0,87/0,69/0,82/0,84/0,83/0,68/0,70/0,71/0,90/0,88/0,67/0,86/0,66/0|
|div18p=18$18|
`;
keysConvert(dosConvert(pkeyData));

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

