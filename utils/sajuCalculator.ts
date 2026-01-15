import { Solar, Lunar } from 'lunar-javascript';

export const calculateSaju = (birthDate: string, birthTime: string, isLunar: boolean) => {
    const date = new Date(`${birthDate}T${birthTime}`);
    let solar: Solar;

    if (isLunar) {
        // 음력일 경우 양력으로 변환하여 처리
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        solar = Lunar.fromYmd(year, month, day).getSolar();
    } else {
        solar = Solar.fromDate(date);
    }

    const lunar = solar.getLunar();
    const eightChars = lunar.getEightChar();

    // 시간대 처리
    const hour = date.getHours();

    // 시주(hour pillar) 계산을 위한 lunar 객체 생성 (시간 포함)
    const solarWithTime = Solar.fromYmdHms(
        solar.getYear(),
        solar.getMonth(),
        solar.getDay(),
        hour,
        date.getMinutes(),
        date.getSeconds()
    );
    const lunarWithTime = solarWithTime.getLunar();
    const eightCharsWithTime = lunarWithTime.getEightChar();

    // 사주팔자(천간+지지) 추출
    const pillars = {
        year: eightChars.getYear(),
        month: eightChars.getMonth(),
        day: eightChars.getDay(),
        hour: eightCharsWithTime.getTime(), // 시주는 getTime() 메서드 사용
    };

    // 오행 분포 점수 계산 (단순화된 로직)
    const allChars = [
        pillars.year, pillars.month, pillars.day, pillars.hour
    ].join('');

    const elements = {
        wood: (allChars.match(/[甲乙寅卯]/g) || []).length * 10,
        fire: (allChars.match(/[丙丁巳午]/g) || []).length * 10,
        earth: (allChars.match(/[戊己辰戌丑未]/g) || []).length * 10,
        metal: (allChars.match(/[庚辛申酉]/g) || []).length * 10,
        water: (allChars.match(/[壬癸亥子]/g) || []).length * 10,
    };

    return {
        pillars,
        elements,
        dayMaster: pillars.day.substring(0, 1), // 일간(나를 상징하는 글자)
    };
};
