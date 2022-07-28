export const convert24hourTo12HourFormat = (time) => {
    const time_part_array = time.split(":");
    let ampm = 'am';
    if (time_part_array[0] >= 12) {
        ampm = 'pm';
    }
    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
    }
    const formatted_time = time_part_array[0] + '' + ampm;
    return formatted_time.replace(/^0+/, '');
  }