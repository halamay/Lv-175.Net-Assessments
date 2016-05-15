
/// <reference path="references.js" />

'use strict';

// Testing main module
describe('Assessments', function () {

    // Mocking application module for every test in this block
    beforeEach(function () {
        module('Assessments');
    });

    // Testing ListingPageController
    describe('ListingPageController', function () {
        var scope, controller, CurrAssessmentService;

        // Mocking ListingPageController
        beforeEach(function () {
            inject(function ($rootScope, $controller, _CurrAssessmentService_) {
                scope = $rootScope.$new();
                CurrAssessmentService = _CurrAssessmentService_; // mocking service;

                controller = $controller('ListingPageController', {
                    $scope: scope,
                    CurrAssessmentService: CurrAssessmentService
                });
            });
        });

        // Test #1 
        it('should set picked for true', function () {
            scope.picked = true;
            expect(scope.picked).toEqual(true);
        });

        // Test #2 
        it('should set Id', function () {
            scope.setCurrentProjectID(4);
           
            expect(scope.currentProjectID).toBe(4);
        });

        // Test #3 
        it('should get Id via service', function () {
            var currentId = CurrAssessmentService.getCurrentId();

            expect(currentId).toEqual(3);
        });

        // Test #4
        it('should change Id via service', function () {
            CurrAssessmentService.setCurrentId(4);
            var currentId = CurrAssessmentService.getCurrentId();

            expect(currentId).toEqual(4);
        })
    });

    // Testing routing states
    describe('About Route', function () {
        // Define global references for injections
        var $state,
          $rootScope,
          state = 'Reports'; 

        // Inject and assign the $state and $rootScope services.
        // Put the template in template cache.
        beforeEach(inject(function (_$state_, $templateCache, _$rootScope_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache.put('../../assessmentsweb/view/home/reports.cshtml', '');
        }));

        // Test whether the url is correct
        it('should respond to URL', function () {
            expect($state.href(state)).toEqual('#/Home/Reports');
        });

        // Test whether our state activates correctly
        it('should activate the state', function () {
            $state.go(state);
            $rootScope.$digest();
            expect($state.current.name).toBe(state);
        });
    });

    // Testing HttpFactory
    describe('HttpFactory', function () {
        var HttpFactory;

        beforeEach(function () {
            inject(function (_HttpFactory_) {
                HttpFactory = _HttpFactory_;
            });
        })
        
        it('should get assessment type', function () {
            var mockResponse = HttpFactory.getAsync('http://localhost:65030/api/assessments/getAssessmentById/3');

            expect(mockResponse[0].Name).toEqual('Skype Assessment');
        });
    });

    describe('PaginationFactory_Test', function () {
        var PaginationFactory;
        var currentPage = 0;
        var itemsPerPage = 5;
        var items = [];

        beforeEach(function () {
            inject(function (_PaginationFactory_) {
                PaginationFactory = _PaginationFactory_;
            });
        });

        //      Test_1
        it('should set items to Pagination Factory', function () {
            PaginationFactory.setItems([{ name: 'one' },
                { name: 'two' },
                { name: 'three' },
                { name: 'four' },
                { name: 'five' },
                { name: 'six' },
                { name: 'seven' },
                { name: 'eight' },
                { name: 'nine' }], 5);

            expect(items[0].name).toEqual('one');
        });

    });
});