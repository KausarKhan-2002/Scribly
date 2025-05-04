function capitlizeWords() {
  if (typeof this !== "string") {
    return;
  }
  const original = this.trim();
  const firstChr = original.split("")[0].toUpperCase();
  const finalStr = firstChr + this.slice(1);
  return finalStr;
}


function startCustomProto() {
  String.prototype.capitalize = capitlizeWords;
}

export default startCustomProto;
