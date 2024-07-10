import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  emailId: string;
  reason: string;
}

@Component({
  selector: 'app-unregister-dialog',
  templateUrl: './unregister-dialog.component.html',
})
export class UnregisterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UnregisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Provide a default value if 'data' is null
    this.data = this.data || { reason: '' };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.data.reason);
  }
}
