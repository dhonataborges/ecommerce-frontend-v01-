import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosUpdateComponent } from './pedidos-update.component';

describe('PedidosUpdateComponent', () => {
  let component: PedidosUpdateComponent;
  let fixture: ComponentFixture<PedidosUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosUpdateComponent]
    });
    fixture = TestBed.createComponent(PedidosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
