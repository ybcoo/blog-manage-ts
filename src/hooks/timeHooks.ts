export const timeHooks = () => {
  /**
   * 毫秒级时间戳 -> "YYYY-MM-DD"
   * @param {number|string} timestampMs 毫秒时间戳
   * @returns {string} 例如 "2026-12-02"
   */
  function formatDateYMD(timestampMs: any) {
    const d = new Date(Number(timestampMs));

    if (Number.isNaN(d.getTime())) {
      return "";
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 0-11
    const date = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  }
  return { formatDateYMD };
};
