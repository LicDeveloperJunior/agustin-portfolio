import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoComponent } from './form-contact.component';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse ContactoComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debería renderizar los datos', () => {
    const fixture = TestBed.createComponent(ContactoComponent);
    const contacto = fixture.componentInstance;
    expect(contacto.datos).toBeTruthy();
  });
});
