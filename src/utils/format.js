export const formatDate = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

export const formatYear = (id, type) => {
  let year = null;
  const date = new Date();

  if (type == 'age') {
    year = formatBirth(id)
  }

  return date.getFullYear() - year.substring(0, 4);
}

export const formatBirth = (id) => {
  if (!id) return ''; // ???普通用户这里有报错
  let birth = null;
  if (id.length == 15) {
    birth = '19' + id.slice(6, 12)
  } else if (id.length == 18) {
    birth = id.slice(6, 14)
  }
  birth = birth.replace(/(.{4})(.{2})/, '$1-$2-') // 待学习---？？？
  return birth;
}