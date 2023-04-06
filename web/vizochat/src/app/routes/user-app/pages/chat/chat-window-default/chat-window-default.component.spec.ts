import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowDefaultComponent } from './chat-window-default.component';

describe('ChatWindowDefaultComponent', () => {
  let component: ChatWindowDefaultComponent;
  let fixture: ComponentFixture<ChatWindowDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWindowDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWindowDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
