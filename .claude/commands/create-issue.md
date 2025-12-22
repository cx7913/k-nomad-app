  # GitHub 이슈 생성

  GitHub 저장소에 새로운 이슈를 생성합니다.

  ## 입력된 이슈 내용

  $ARGUMENTS

  ---

  당신은 GitHub CLI(`gh`)를 사용하여 이슈를 생성하는 전문가입니다.

  ## 작업 순서

  1. **저장소 확인**
     - `git remote -v` 명령어로 현재 디렉토리가 GitHub 저장소인지 확인
     - GitHub 저장소가 아니면 오류 메시지 출력

  2. **gh CLI 확인**
     - `gh --version` 명령어로 GitHub CLI 설치 여부 확인
     - 설치되어 있지 않으면 설치 방법 안내:
       ```
       # macOS
       brew install gh

       # Linux
       sudo apt install gh  # Ubuntu/Debian
       sudo dnf install gh  # Fedora

       # Windows
       winget install --id GitHub.cli
       ```
     - `gh auth status`로 인증 상태 확인
     - 인증되지 않았으면 `gh auth login` 실행 안내

  3. **이슈 내용 파싱**
     - 사용자가 입력한 `$ARGUMENTS` 내용을 분석
     - **제목**: 첫 줄을 제목으로 사용
     - **본문**: 나머지 내용을 본문으로 사용
     - 빈 줄로 제목과 본문 구분

  4. **이슈 생성**
     - `gh issue create` 명령어 사용
     - 제목과 본문을 heredoc 또는 파일로 전달
     - 예시:
       ```bash
       gh issue create --title "제목" --body "본문 내용"
       ```

  5. **결과 출력**
     - 생성된 이슈의 번호와 URL을 명확하게 출력
     - 예시:
       ```
       ✓ 이슈가 생성되었습니다!
       제목: 버그: 로그인 버튼이 작동하지 않음
       번호: #42
       URL: https://github.com/owner/repo/issues/42
       ```

  ## 사용 예시

  ### 입력 1: 간단한 이슈
  /create-issue 로그인 버튼 버그 수정 필요

  → 제목만 있는 이슈 생성

  ### 입력 2: 상세한 이슈
  /create-issue 버그: 로그인 버튼이 작동하지 않음

  로그인 페이지에서 로그인 버튼을 클릭해도 아무 반응이 없습니다.

  재현 방법:
  1. 로그인 페이지 접속 (/login)
  2. 이메일/비밀번호 입력
  3. 로그인 버튼 클릭

  예상 결과: 로그인 성공 후 대시보드로 이동
  실제 결과: 버튼 클릭해도 아무 반응 없음

  환경:
  - 브라우저: Chrome 120
  - OS: macOS 14

  → 제목과 상세 본문이 있는 이슈 생성

  ## 추가 옵션 (선택사항)

  사용자가 이슈 생성 시 추가 옵션을 원할 수 있습니다:

  - **라벨 추가**: `--label bug,urgent`
  - **담당자 지정**: `--assignee @me` 또는 `--assignee username`
  - **마일스톤**: `--milestone "v1.0"`
  - **프로젝트**: `--project "Project Board"`

  사용자가 특별히 요청하지 않으면 기본 옵션만 사용하세요.

  ## 오류 처리

  - Git 저장소가 아님 → "이 디렉토리는 git 저장소가 아닙니다."
  - GitHub 저장소가 아님 → "GitHub 원격 저장소가 설정되어 있지 않습니다."
  - gh CLI 미설치 → 설치 방법 안내
  - gh 인증 안됨 → `gh auth login` 실행 안내
  - 권한 없음 → "이슈를 생성할 권한이 없습니다. 저장소 접근 권한을 확인하세요."

  ## 주의사항

  - 이슈 제목은 필수입니다
  - 본문은 선택사항입니다 (제목만으로도 이슈 생성 가능)
  - 생성된 이슈는 취소할 수 없으므로 신중하게 작성하세요
  - 이슈 생성 후 웹 브라우저에서 추가 편집 가능

  ---

  이제 위 지침에 따라 사용자가 입력한 내용으로 GitHub 이슈를 생성하세요.

  ---
  파일 생성 방법

  터미널에서 다음 명령어를 실행하세요:

  cat > .claude/commands/create-issue.md << 'EOF'
  # 위 내용 전체를 여기에 붙여넣기
  EOF

  또는 에디터로 직접 생성:

  nano .claude/commands/create-issue.md
  # 또는
  vim .claude/commands/create-issue.md
  # 또는
  code .claude/commands/create-issue.md

  파일을 생성하신 후 /create-issue 명령어로 사용하실 수 있습니다