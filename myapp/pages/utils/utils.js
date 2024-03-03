export function addMinutesToCurrentTime(minutes) {
  // 현재 시간을 나타내는 Date 객체 생성
  const now = new Date();

  // 현재 시간에 특정 분을 추가
  const newTime = now.getTime() + minutes * 60000; // 1분 = 60000밀리초

  return newTime;
}
