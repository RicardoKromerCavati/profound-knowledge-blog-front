import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/api/authentication/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateValidator } from './create-validator.validator';
import { PostsService } from '../../core/api/posts/posts.service';
import { CreatePostRequest } from '../../core/api/posts/post.create.request';
import { finalize } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-create',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateComponent {
  private readonly postsService = inject(PostsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly i18NService = inject(I18nService);

  readonly authService = inject(AuthService);

  showFileErrorMessage: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  private postImageBase64: string = '';

  createFormGroup = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    fileSource: this.formBuilder.control<File | null>(null, [Validators.required, CreateValidator.isFileValid])
  });

  submitPostCreation(): void {
    const rawValue = this.createFormGroup.getRawValue();

    const createPostRequest: CreatePostRequest = {
      title: rawValue.title,
      content: rawValue.content,
      imageBase64: this.postImageBase64
    };

    this.isLoading = signal(true);

    this.postsService.createPost(createPostRequest)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          alert(this.i18NService.t('POST_CREATED_SUCCESSFULLY'));
        },
        error: (err: string) => {
          alert(err);
        }
      })

  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      this.createFormGroup.patchValue({
        fileSource: file
      });

      const fileControl = this.createFormGroup.get('fileSource');
      fileControl?.updateValueAndValidity();

      if (fileControl?.invalid) {
        fileControl.setValue(null);
        fileInput.value = '';
        this.showFileErrorMessage = signal(true);;
      }
      else {
        this.showFileErrorMessage = signal(false);;
        const reader = new FileReader();

        reader.onload = () => {
          this.postImageBase64 = reader.result as string;
          this.showFileErrorMessage = signal(false);;
        };

        reader.onerror = () => {
          alert('Error reading file');
          fileControl?.setValue(null);
          fileInput.value = '';
          this.showFileErrorMessage = signal(true);;
        };

        reader.readAsDataURL(file);
      }
    }
  }


}
