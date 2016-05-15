var AttachmentsController = function ($scope, $stateParams, AttachmentService, AssessmentService, API_URLS, $injector, ngDialog) {

    document.getElementById('Form').className = "assessPanel";
    document.getElementById('WeakAreas').className = "assessPanel";
    document.getElementById('StrongAreas').className = "assessPanel";
    document.getElementById('FillAssessment').className = "assessPanel";
    document.getElementById('Attachments').className = "assessPanelChosen";
    document.getElementById('ActionItems').className = "assessPanel";

    $scope.addActive = -1;
    $scope.dragAreaState = 'default';
    $scope.uploadText = 'Waiting for data...';
    $scope.idOfAttachmentToDelete = null;

    $scope.assessmentName;
    $scope.currentId = $stateParams.Id;
    $scope.attachments = [];
    $scope.file = {};
    $scope.maxSize = 30000000;
    $scope.comment = '';

    AssessmentService.getAssessmentById($scope.currentId).then(function (response) {
        $scope.assessmentName = response.Name;
    });

    AttachmentService.getAttachmentsByAssessmemtId($scope.currentId).then(function (response) {
        $scope.attachments = response;
    });

    $scope.triggerAddActive = function () {
        $scope.addActive = -$scope.addActive;
    };

    $scope.reloadAttachments = function () {
        $scope.attachments = {};
        AttachmentService.getAttachmentsByAssessmemtId($scope.currentId).then(function (response) {
            $scope.attachments = response;
        });
    };

    $scope.setDropAreaState = function (value) {
        $scope.dragAreaState = value;
    };

    $scope.clearAddForm = function () {
        if ($scope.file) {
            $scope.file = {};
            $scope.setDropAreaState('default');
        }

        if ($scope.comment) {
            $scope.comment = '';
        }
    };

    $scope.downloadFile = function (fileName) {

        window.open(API_URLS.downloadAttachmentFile + fileName);
    };

    $scope.deleteAttachmentFile = function () {
        AttachmentService.deleteFile($scope.idOfAttachmentToDelete).then(function () {
            $scope.reloadAttachments();
        });
    };

    $scope.openDeleteConfirmWindow = function(id)
    {
        $scope.idOfAttachmentToDelete = id;

        ngDialog.open({
            template: '<h3>Really delete this attachment?</h3>' +
                       '<button class="btn btn-primary btn-sm" ng-click="deleteAttachmentFile();closeThisDialog(0);">Yes</button>' +
                        '<button class="btn btn-default btn-sm" ng-click="closeThisDialog(0)">No</button>',
            plain: true,
            scope: $scope
        });
    }


    //=============File upload management============

    // init event handlers
    function dragOver(evt) {
        $scope.$apply(function () {
            evt.preventDefault();
            evt.stopPropagation();
        });
    };

    function dragEnterLeave(evt) {
        $scope.$apply(function () {
            evt.preventDefault();
            evt.stopPropagation();
        });
    };

    function transferComplete(evt) {
        $scope.$apply(function () {
            var json = {
                name: $scope.file.name,
                assessmentId: $scope.currentId,
                size: $scope.file.size,
                comment: $scope.comment
            };

            $scope.clearAddForm();
            AttachmentService.postAttachment(json).then(function () {
                $scope.uploadText = 'Uploaded successfully!';
                $scope.reloadAttachments();
            });
        });
    }

    function transferFailed(evt) {
        $scope.$apply(function () {
            $scope.uploadText = 'Upload failed!';
        });
    }

    // add drag-n-drop event listeners to the drop area
    var dropArea = document.getElementById('dropZone');

    dropArea.addEventListener("dragenter", dragEnterLeave, false);
    dropArea.addEventListener("dragleave", dragEnterLeave, false);
    dropArea.addEventListener("dragover", dragOver, false);

    dropArea.addEventListener("drop", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        $scope.$apply(function () {
            if ($scope.file) {
                $scope.file = {};
            }
            if (evt.dataTransfer.types.indexOf('Files') >= 0) {
                var loaded = evt.dataTransfer.files
                if (loaded.length > 0) {
                    if (loaded[0].size <= $scope.maxSize) {
                        $scope.file = loaded[0];
                        $scope.setDropAreaState('loaded');
                    }
                    else {
                        $scope.setDropAreaState('file-too-big');
                    }
                }
            }
            else {
                $scope.setDropAreaState('default');
            }
        });
    });

    // implement upload and post
    $scope.addAttachment = function () {
        var data = new FormData();
        data.append('uploadedFile', $scope.file, $scope.file.name);

        var objXhr = new XMLHttpRequest();
        objXhr.addEventListener("load", transferComplete, false);
        objXhr.addEventListener("error", transferFailed, false);

        objXhr.open("POST", API_URLS.uploadAttachmentFile);
        $scope.uploadText = 'Uploading file...'
        objXhr.send(data);
    };

};

AttachmentsController.$inject = ['$scope', '$stateParams', 'AttachmentService', 'AssessmentService', 'API_URLS', '$injector', 'ngDialog'];
app.controller('AttachmentsController', AttachmentsController);