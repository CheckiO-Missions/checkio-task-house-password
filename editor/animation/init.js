requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {

        function HousePasswordDiv(root) {

            var vMark = "&#10004;";
            var xMark = "&#10008;";

            this.createDiv = function (text) {
                var flag_l = false;
                var flag_u = false;
                var flag_d = false;
                var password_word_html = '';
                for (var i = 0; i < text.length; i++) {
                    if (text[i].match('[a-z]')) {
                        password_word_html += "<span class='lowercase'>";
                        flag_l = true;
                    }
                    else if (text[i].match('[A-Z]')) {
                        password_word_html += "<span class='uppercase'>";
                        flag_u = true;
                    }
                    else if (text[i].match('[0-9]')) {
                        password_word_html += "<span class='digital'>";
                        flag_d = true;
                    }
                    else
                        password_word_html += "<span>" + text[i] + "</span> ";
                    password_word_html += text[i] + "</span> ";
                }
                if (i < 9)
                    for (i; i < 9; i++)
                        password_word_html += "<span>&nbsp;</span> ";

                var password_length_html = 'length ';
                if (text.length < 10)
                    password_length_html += "&lt; 10";
                else
                    password_length_html += " &ge; 10";

                if (flag_l)
                    root.find('.lower-include').html(vMark).addClass('vote_up');
                else
                    root.find('.lower-include').html(xMark).addClass('vote_down');
                if (flag_u)
                    root.find('.upper-include').html(vMark).addClass('vote_up');
                else
                    root.find('.upper-include').html(xMark).addClass('vote_down');
                if (flag_d)
                    root.find('.digital-include').html(vMark).addClass('vote_up');
                else
                    root.find('.digital-include').html(xMark).addClass('vote_down');

                root.find('.password-length').html(password_length_html);
                root.find('.password-word').html(password_word_html);
            };

            var passwordInput;

            this.createFeedback = function () {
                passwordInput = root.find('.password_input');
                passwordInput.focus();
                var lowerSpan = root.find(".lower-include");
                var upperSpan = root.find(".upper-include");
                var digitalSpan = root.find(".digital-include");
                var lengthSpan = root.find(".length");

                var voteChange = function(pass, span, pattern) {
                    if (pass.match(pattern)) {
                        if (!span.hasClass("vote-up")) {
                            span.addClass("vote-up");
                            span.html(vMark);
                        }
                    }
                    else {
                        span.removeClass("vote-up");
                        span.html(xMark);
                    }
                };

                var checkPassword = function () {
                    var pass = passwordInput.val();
                    voteChange(pass, lowerSpan, '.*[a-z].*');
                    voteChange(pass, upperSpan, '.*[A-Z].*');
                    voteChange(pass, digitalSpan, '.*[0-9].*');
                    lengthSpan.html(pass.length);
                };

                checkPassword();

                passwordInput.keyup(checkPassword);
            };

            this.getPassword = function () {
                return passwordInput.val();
            }

        }
        var $tryit;
        var io = new extIO({
            animation: function($expl, data){
                var checkioInput = data.in[0];
                if (!checkioInput){
                    return;
                }
                var explanationDiv = new HousePasswordDiv($expl);
                explanationDiv.createDiv(checkioInput);

            },
            animationTemplateName: 'animation',
            tryit: function(){
                var this_e = this;
                $tryit = $(this_e.extSetHtmlTryIt(this_e.getTemplate('tryit')));

                var passwordInput = $tryit.find('.password_input');
                passwordInput.focus();

                $tryit.find('.bn-check').click(function (e) {
                    var password = passwordInput.val();
                    this_e.extSendToConsoleCheckiO(password);
                    e.stopPropagation();
                    return false;
                });
            },
            retConsole: function (ret) {
                $tryit.find('.checkio_result').html("Your result:<br>" + ret);
            },
            functions: {
                js: 'housePassword',
                python: 'checkio',
            }
        });
        io.start();
    }
);
