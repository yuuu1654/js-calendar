const print_calendar = (year, month) =>{
  console.log(`      ${month}月 ${year}`)
  console.log("日 月 火 水 木 金 土")
  // ▼以下だと日付がUTCで表示されるので、15時間遅れて表示される
  const firstDay = new Date(year, month - 1, 1) //2024-07-31T15:00:00.000Z
  const lastDay = new Date(year, month , 0) // 2024-08-30T15:00:00.000Z
  
  /**
   * while文で月の最初の日~最終日まで加工処理を行う
   * firstDateを使ってループするcurrentDateを初期化
   * outputに1日が始まるまでのスペースと、表示するために加工した日にちを連結して表示する
   * currentDateが土曜日なら改行する (改行を追加)
   * ループの最後にcurrentDateをインクリメントする
   * padStartで、二桁の日付とスペースを揃える
   * 追加でスペースも連結してレイアウト調整
   */
  const initialSpaces = "   ".repeat(firstDay.getDay())
  let currentDate = new Date(firstDay)
  let output = initialSpaces;
  while (currentDate <= lastDay) {
    output += currentDate.getDate().toString().padStart(2) + " ";
    if (currentDate.getDay() === 6) {
      output += "\n";
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(output);
}

// コマンドライン引数を解析する関数
const parseArgs = (args) => {
  let options = {};
  args.map((arg, index, array) => {
    if (arg === "-m") {
      options.month = parseInt(array[index + 1])
    }
  }) 
  return options;
}

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

const main = () => {
  const options = parseArgs(process.argv)
  // optionsに「hoge」などの出鱈目なものが入った時はエラー
  if (isNaN(options.month) && !isEmpty(options)) {
    console.error("-mオプションの引数には数字入れろ！")
    return
  }
  const now = new Date();
  const year = now.getFullYear();
  const month = options.month || now.getMonth() + 1;
  if (month < 1 || 12 < month) {
    console.error("-mオプションの数字は1~12までやろが！(猿でも分か...)")
    return
  }
  print_calendar(year, month)
}

main();