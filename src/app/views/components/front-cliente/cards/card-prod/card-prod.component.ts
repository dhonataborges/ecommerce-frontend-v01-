import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-card-prod',
  templateUrl: './card-prod.component.html',
  styleUrls: ['./card-prod.component.css']
})
export class CardProdComponent implements OnInit{
  
   ngOnInit(): void {  
   }

  // // const multipleItemCarousel = document.querySelector('#carouselExampleControls') as HTMLAnchorElement;

  // // const carousel = new bootstrap.Carousel(this.multipleItemCarousel, {
  // //   interval: false
  // // })

  // constructor() {
  //   var carouselWidth; 
  //   var cardWidth;
  //   var multipleItemCarousel;
  //   var scrollPosition = 0;

  // }
  
  // multipleItemCarousel = document.querySelector('#carouselExampleControls') as HTMLAnchorElement;
  
  // carouselWidth = document.querySelector('.carousel-inner').scrollWidth;
  // cardWidth = document.querySelectorAll('.carousel-item').length;

  // next1(){
  //   console.log(this.carouselWidth);
  //   console.log(this.cardWidth);
  // }



  // if(window.matchMedia("(min-width: 576px)").matches) {
  //     const carousel = new bootstrap.Carousel(multipleItemCarousel, {
  //        interval: false
  //     })
 
  //     var carouselWidth = $('.carousel-inner')[0].scrollWidth;
  //     var cardWidth = $('.carousel-item').width();
 
  //     var scrollPosition = 0;
 
  //     $('.carousel-control-next').on('click', function(){
  //         if(scrollPosition < (carouselWidth - (cardWidth * 4))){
  //                         console.log('next');
  //             scrollPosition = scrollPosition + cardWidth;
  //            $('.carousel-inner').animate({scrollLeft: scrollPosition},600);
  //         }
  //     });
 
  //     $('.carousel-control-prev').on('click', function(){
  //        if(scrollPosition > 0){
  //             console.log('prev');
  //             scrollPosition = scrollPosition - cardWidth;
  //             $('.carousel-inner').animate({scrollLeft: scrollPosition},600);
  //         }
  //     });
 
  // } else {
  //     $(multipleItemCarousel).addClass('slide');
  // }

}

