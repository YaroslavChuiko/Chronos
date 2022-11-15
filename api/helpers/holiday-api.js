const { HolidayAPI } = require('holidayapi');
const { IPinfoWrapper } = require('node-ipinfo');

const ipinfo = new IPinfoWrapper(process.env.IPINFO_TOKEN);
const holidayAPI = new HolidayAPI({ key: process.env.HOLIDAY_API_KEY });
const fallback = { ip: '1.1.1.1', country: 'US' };

const getHolidaysByIP = async (ip) => {
  const { countryCode } = await ipinfo.lookupIp(ip || fallback.ip);

  return (
    await holidayAPI.holidays({
      country: countryCode || fallback.country,
      year: 2021,
    })
  ).holidays;
};

module.exports = { getHolidaysByIP };
