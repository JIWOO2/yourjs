package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class Self_IntroPostReq {
    private String question;
    private String contents;
    private Integer noticeSeq;
    private String introTag;
}