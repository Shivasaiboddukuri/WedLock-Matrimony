import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterDialogComponent } from './unregister-dialog.component';

describe('UnregisterDialogComponent', () => {
  let component: UnregisterDialogComponent;
  let fixture: ComponentFixture<UnregisterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnregisterDialogComponent]
    });
    fixture = TestBed.createComponent(UnregisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
