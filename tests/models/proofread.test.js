const Proofread = require('../../models/proofread').Proofread;

test('testShouldProofread',  async () => {
    const proofreader = new Proofread();
    const text = "魚を食べれる";

    const result = await proofreader.exec(text);
    expect(result.message.map(i => i["message"])).toStrictEqual(["ら抜き言葉を使用しています。","文末が\"。\"で終わっていません。"]);
})

const testAttachProofreadRuleParam = [
    {
        text:"よろしければ明日必ず弊社にお立ち寄りし、この資料作成週末までに間に合うよう作成してください。",
        expected:["制限文字数(40文字)を超えています"]
    },
    {
        text:"ぜひ、私と、一緒に、公園へ、行きましょう。",
        expected:["一つの文で\"、\"を4つ以上使用しています"]
    },
    {
        text:"今日は早朝から出発したが、定刻には間に合わなかったが、無事会場に到着した。",
        expected: ["文中に逆接の接続助詞 \"が\" が二回以上使われています。"]
    },
    {
        text: "かな漢字変換により漢字を多用する傾向がある。しかし漢字の多用の読みにくさをもたらす側面は否定できない。しかし、平仮名が多い文は間延びした印象を与える恐れもある。",
        expected: ["同じ接続詞（しかし）が連続して使われています。"]
    },
    {
        text: "それが事件の発端だったといえなくもないです。",
        expected: ["二重否定: 〜なくもない"]
    },
    {
        text: "材料不足で代替素材で製品を作った。",
        expected: ["一文に二回以上利用されている助詞 \"で\" がみつかりました。"]
    },
    {
        text: "魚を食べれないです。",
        expected: ["ら抜き言葉を使用しています。"]
    }
];

test('testAttachProofreadRule', async () => {
    const proofreader = new Proofread();
    for(const param of testAttachProofreadRuleParam) {
        const result = await proofreader.exec(param.text);
        expect(result.message.map(i => i["message"])).toStrictEqual(param.expected);
    }
})