const utils = {
  slugify: function (content) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return content
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  },

  dateNormalize: function (dateToNormalize) {
    const date = new Date(dateToNormalize);
    const displayDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} g:${date.getHours()}:${(
      "0" + date.getMinutes()
    ).slice(-2)}`;
    return displayDate;
  },
  txtPreview: function (text, length) {
    const shorthand = text.replace(/(<([^>]+)>)/gi, "");
    return shorthand.substring(0, length) + " (...)";
  },
};

export default utils;
