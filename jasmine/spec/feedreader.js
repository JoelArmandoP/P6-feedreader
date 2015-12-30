/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined and not empty', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    /* A test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('menu is hidden by default', function(){
            expect(document.body.classList).toContain('menu-hidden');
        });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         *  have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu clicked shows and hides', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger( "click" );
            expect(document.body.classList).not.toContain('menu-hidden');
            menuIcon.trigger( "click" );
            expect(document.body.classList).toContain('menu-hidden');
        });
    });

        

    /* A test suite named "Initial Entries" */
     describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('loads initial entries', function() {
            expect($('.feed')[0].children.length).toBeGreaterThan(0);
        });
    });

    /* A test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        var feedContent = null;

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, function () {
                feedContent = $('.feed').find('h2').text();
                loadFeed(1, done);
            });
        });

        it('loads different content for different feeds', function() {
            expect($('.feed').find('h2').text()).not.toEqual(feedContent);
        });
    });
}());
