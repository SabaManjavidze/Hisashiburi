export const formatDate = (date) => {
  const split = date.split(",");
  const mm_dd_yyyy = split[0].split("/");
  const hh_mm_ss = split[1].split(":");
  const formated_date = new Date(
    mm_dd_yyyy[2],
    mm_dd_yyyy[0],
    mm_dd_yyyy[1],
    hh_mm_ss[0],
    hh_mm_ss[1],
    hh_mm_ss[2]
  );
  return formated_date;
};
