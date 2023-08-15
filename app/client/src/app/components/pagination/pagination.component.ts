import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    imports: [CommonModule],
    standalone: true,
})
export class PaginationComponent {
    @Input() baseUrl = '';
    @Input() currentPageIndex = 0;
    @Input() lastPageIndex = 0;
    @Input() pageLinks: ILink[];

    constructor(
        private router: Router,
    ) {

    }

    getPageIndexFromPaginationUrl (url: string): number {
        if(url && url.indexOf("page=") > -1) {
            return Number(url.split("page=")[1]);
        }
        return 1;
    }

    paginate(link: ILink) {
        const pageIndex = this.getPageIndexFromPaginationUrl(link.url);
        this.router.navigate([this.baseUrl], {queryParams: {page: pageIndex}});
    }
}

interface ILink {
    url: string;
    label: string;
    active: boolean;
}
