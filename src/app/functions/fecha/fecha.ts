export class Fecha {
  static formatDate_yyyymmdd(date: any) {
    const split1 = String(date).split('T');
    const split2 = split1[0].split('-');
    const day = split2[2];
    const month = split2[1];
    const year = split2[0];
    return year + '-' + month + '-' + day;
  }

  static formatDate_ddmmyyyy(date: any) {
    const split1 = String(date).split('T');
    const split2 = split1[0].split('-');
    const day = split2[2];
    const month = split2[1];
    const year = split2[0];
    return day + '-' + month + '-' + year;
  }

  static formatDate_yyyy(date: any) {
    const split1 = String(date).split('T');
    const split2 = split1[0].split('-');
    const year = split2[0];
    return year;
  }

  static formatDate_yyyy_num(date: any) {
    const split1 = String(date).split('T');
    const split2 = split1[0].split('-');
    const year = split2[0];
    return parseInt(year);
  }
}
