import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ISkill } from 'src/app/core/models/ISkill.model';
import { SkillFormBuilderService } from '../../services/skill-form-builder.service';
import { FormActionsButtonComponent } from 'src/app/shared/components/form-actions-button/form-actions-button.component';

@Component({
  selector: 'app-skill-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FormActionsButtonComponent,
  ],
  templateUrl: './skill-form.component.html',
  styleUrl: './skill-form.component.less',
})
export class SkillFormComponent implements OnInit, OnDestroy {
  @Input() skillData: Partial<ISkill> | null = null;
  @Output() formSubmitted = new EventEmitter<ISkill>();
  @Output() formCancel = new EventEmitter<void>();

  showId = false;
  skillForm!: FormGroup;

  constructor(private formBuilderService: SkillFormBuilderService) {}
  ngOnDestroy(): void {
    this.skillForm.reset();
  }

  ngOnInit(): void {
    this.skillForm = this.formBuilderService.build(this.skillData ?? {});
  }

  submit(): void {
    if (this.skillForm.valid) {
      const skillsAux: string = this.skillForm.get('skills')?.value;
      const skillObj: ISkill = {
        id: this.skillForm.get('id')?.value,
        name: this.skillForm.get('name')?.value,
        skills: skillsAux ? skillsAux.split(',') : [],
        urlLogo: this.skillForm.get('urlLogo')?.value,
        type: this.skillForm.get('type')?.value,
        isLearning: this.skillForm.get('isLearning')?.value,
      };
      this.formSubmitted.emit(skillObj);
      this.skillForm.reset();
    } else {
      this.skillForm.markAllAsTouched();
    }
  }

  cancel() {
    this.formCancel.emit();
  }
}
