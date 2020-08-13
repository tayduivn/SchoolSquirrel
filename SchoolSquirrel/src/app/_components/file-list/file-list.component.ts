import {
    Component, Input, ViewChild, ElementRef,
} from "@angular/core";
import { RemoteService } from "../../_services/remote.service";
import { FilenamePipe } from "../../_pipes/filename.pipe";
import { FileextPipe } from "../../_pipes/fileext.pipe";
import { AuthenticationService } from "../../_services/authentication.service";

@Component({
    selector: "app-file-list",
    templateUrl: "./file-list.component.html",
    styleUrls: ["./file-list.component.scss"],
})
export class FileListComponent {
    @Input() public edit = false;
    @Input() public type: "materials" | "worksheets";
    @Input() public id: number;
    @Input() public files: any[] = [];
    @Input() public context: string;
    @ViewChild("fileInput") private fileInput: ElementRef;

    constructor(
        private remoteService: RemoteService,
        private authenticationService: AuthenticationService,
    ) { }

    public uploadFile(): void {
        this.fileInput.nativeElement.click();
    }

    public delete(file: {name: string}): void {
        // eslint-disable-next-line
        if (!confirm("Soll diese Datei wirklich gelöscht werden?")) {
            return;
        }
        this.remoteService.delete(`files/${this.context}/${file.name}`).subscribe((data) => {
            if (data && data.success) {
                this.files = this.files.filter((f) => f.name !== file.name);
            }
        });
    }

    public download(file: { name: string }): void {
        window.open(this.remoteService.getImageUrl(this.getContextUrl(file), this.authenticationService), "_blank");
    }

    private getContextUrl(file: { name: string; }): string {
        return `${this.context}/${this.id}/${this.type}/${new FilenamePipe().transform(file.name as string)}.${new FileextPipe().transform(file.name as string)}`;
    }

    public onFileSelected(event: Event): void {
        if (!this.id || !this.edit) {
            return;
        }
        const { files } = event.target as HTMLInputElement;
        if (files[0]) {
            this.remoteService.postFile(`files/${this.context}/${this.id}/upload`, {
                path: `/${this.type}/`,
            }, "file", files[0]).subscribe((e) => {
                if (e && Array.isArray(e)) {
                    this.files = e;
                }
            });
        }
    }

    public newFile(type: "docx" | "xlsx" | "pptx"): void {
        this.remoteService.post(`files/${this.context}/${this.id}/new/${this.type}/Unbenannt.${type}`, {}).subscribe((e) => {
            if (e && Array.isArray(e)) {
                this.files = e;
            }
        });
    }
}
