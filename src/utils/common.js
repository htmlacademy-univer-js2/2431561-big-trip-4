function capitalize(string){
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

function getLastWord(string) {
  const wordsList = string.split(' ');
  return wordsList.at(-1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {capitalize,getLastWord, updateItem};
