export const toBase64 = (buffer) => {
  const _tempBuff = Buffer.from(buffer).toString("base64");

  const cont = "image/jpeg";

  const imageBase64 = `data:image/${cont};base64,${_tempBuff}`;

  return imageBase64;
};
