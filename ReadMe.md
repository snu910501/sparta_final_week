# 프로젝트 소개

원룸 후기 정보 공유 사이트

# 1조 백엔드 팀 소개

- 박영호 - 팀장 서비스 로직 구현
- 권태형 - 팀원 커뮤니티 담당 로직 구현
- 서정득 - 팀원 카카오(SNS)로그인 구현

# 백엔드에서 시도한 것들

- 3 layer architecture 적용
- 클래스 문법 사용으로 OOP 반영
- 프런트에서 잘못된 형식으로 보낸 request로 서버가 셧다운 되지 않도록 에러미들웨어 적용, try catch로 에러 잡기
- 깃 전략 (develop 브랜치로 머지하고 최종본 master로 배포하기)
- prettier 사용하여 pull request 시 conflict 최소화
- KAKAO 소셜 로그인 구현
- 데이터 분석에서 최선의 결과 도출

# 백엔드 기술 스택

- Node.js
- Express
- Multer
- AWS S3
- Sequelize
- mySQL
- jsonwebtoken
- Nginx

# ERD

![Screen Shot 2022-12-17 at 2 28 59 PM](https://drawsql.app/teams/akalavigne/diagrams/phone82-pro)

# API 명세 및 프로젝트 관리 노션

[4조 SA 노션](https://www.notion.so/5-S-A-2cdf9e87b350433e9f8b865e835834f4)

# 백엔드 협업 프로세스

1. 개발 시작전 프로젝트 구조 통일
2. 3 layered architecture 사용
3. prettier 사용으로 컨밴션 맞추기
4. 각자 기능 완료하면 깃헙 develop 브랜치로 pull request, conflict 함께 수정 후 merge & pull 하기

# .env

- PORT=
- DB_USERNAME=
- DB_PW=
- DB_HOST=
- SECRET_KEY=
- ACCESKEYID=
- SECRETKEYID=
