function searcher(array, keyword, isShortMovie) {
  console.log(keyword);
  const result = array.reduce((prev, curr,index) => {
    const condition = isShortMovie ? curr.duration <= 40 : true;
    if (condition&&curr.nameRU.toLowerCase().includes(keyword.toLowerCase()))
      return prev.concat(curr);
    return prev;
  }, []);
  return result;
}

export default searcher;
