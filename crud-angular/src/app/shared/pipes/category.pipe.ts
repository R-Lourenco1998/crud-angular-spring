import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'front-end': return 'code';
      case 'back-end': return 'computer';
    }
    return 'code';

  }
}

/*
    switch(value){
      case 'front-end': return 'code';
      case 'back-end': return 'computer';
    }
    return 'code';
  }*/


/*

    if(value === 'front-end'){
      return 'code';
    } else if (value === 'back-end') {
      return 'computer';
    } else {
      return 'code';
    }
    }

    */
