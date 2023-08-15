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
    @Input() currentPageIndex = 0;
    @Input() lastPageIndex = 0;
    @Input() pageLinks: ILink[];

    constructor(
        private router: Router,
    ) {

    }

    getPageIndexFromPaginationUrl (url: string): number {
        console.log(url);
        if(url && url.indexOf("page=") > -1) {
            return Number(url.split("page=")[1]);
        }
        return 1;
    }

    paginate(link: ILink) {
        console.log(link);
        const pageIndex = this.getPageIndexFromPaginationUrl(link.url);
        this.router.navigate(['/ip-addresses'], {queryParams: {page: pageIndex}});
    }
}

interface ILink {
    url: string;
    label: string;
    active: boolean;
}
