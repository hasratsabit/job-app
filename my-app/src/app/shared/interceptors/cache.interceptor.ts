import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from "@angular/common/http";
import { CachingService } from "../services/caching.service";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()

export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: CachingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Pass along non-cacheable request and  invalidate cacheing.
        if(req.method !== 'GET') {
            console.log(`Invalidating Cache: ${req.method} ${req.url}`);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        // Attempt to retrieve a cached response. 
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

        // Return cached response.
        if(cachedResponse) {
            console.log(`Returning a cached response: ${cachedResponse.url}`);
            console.log(cachedResponse);
            return of(cachedResponse);
        }

        // Send request to server and add response to cache
        return next.handle(req)
            .pipe(
                tap(event => {
                    if(event instanceof HttpResponse) {
                        console.log(`Adding Item to cache: ${req.url}`);
                        this.cacheService.put(req.url, event);
                    }
                })
            )
    }
}