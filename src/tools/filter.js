exports.dateFormat = originVal => {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
exports.cartype = type => {
  const types = ['-', '5人以下客车', '5人以上客车', '货车', '其他']
  return types[type]
}

exports.billtype = type => {
  const types = ['-', '交强险', '商业险', '验车']
  return types[type]
}
