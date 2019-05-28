import { TestBed, async, inject } from '@angular/core/testing';

import { PlayersDetailsGuard } from './players-details.guard';

describe('PlayersDetailsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayersDetailsGuard]
    });
  });

  it('should ...', inject([PlayersDetailsGuard], (guard: PlayersDetailsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
