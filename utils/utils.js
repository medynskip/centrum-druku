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

  dateNormalize: function (dateToNormalize, withTime) {
    const date = new Date(dateToNormalize);
    const time = withTime
      ? `g:${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
      : "";
    const displayDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${time}`;
    return displayDate;
  },

  isHoliday: function (toDate) {
    const date = new Date();
    date.setFullYear(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    if (date.getDay() == 6 || date.getDay() == 0) return true;
    if (date.getMonth() === 0 && date.getDate() == 1) return true; // Nowy Rok
    if (date.getMonth() === 0 && date.getDate() == 6) return true; // Trzech Króli
    if (date.getMonth() == 4 && date.getDate() == 1) return true;
    if (date.getMonth() == 4 && date.getDate() == 3) return true;
    if (date.getMonth() == 7 && date.getDate() == 15) return true; // Wniebowzięcie Najświętszej Marii Panny, Święto Wojska Polskiego (rocznica “cudu nad Wisłą”)
    if (date.getMonth() == 10 && date.getDate() == 1) return true; // Dzień Wszystkich Świętych
    if (date.getMonth() == 10 && date.getDate() == 11) return true; // Dzień Niepodległości
    if (date.getMonth() == 11 && date.getDate() == 25) return true; // Boże Narodzenie
    if (date.getMonth() == 11 && date.getDate() == 26) return true; // Boże Narodzenie
    const a = date.getFullYear() % 19;
    const b = date.getFullYear() % 4;
    const c = date.getFullYear() % 7;
    let d = (a * 19 + 24) % 30;
    const e = (2 * b + 4 * c + 6 * d + 5) % 7;
    if (d == 29 && e == 6) d -= 7;
    if (d == 28 && e == 6 && a > 10) d -= 7;
    let easter = new Date();
    easter.setFullYear(date.getFullYear(), 2, 23);
    easter.setDate(easter.getDate() + (d + e));
    // march22.setDate(march22.getDate() + e);
    if (date.getTime() === easter.getTime()) return true; // Wielkanoc (poniedziałek)
    if (date - 60 == easter) return true; // Boże Ciało
    return false;
  },

  calculateWorkDays: function (start, days) {
    let i = 0;
    let working = 0;
    let item = new Date(start);
    while (working < days) {
      item.setDate(item.getDate() + 1);

      if (this.isHoliday(item) == false) {
        working++;
      }
      i += 1;
    }
    return this.dateNormalize(item, false);
  },

  txtPreview: function (text, length) {
    const shorthand = text.replace(/(<([^>]+)>)/gi, "");
    return shorthand.substring(0, length) + " (...)";
  },
};

export default utils;
