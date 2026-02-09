FROM node

WORKDIR /career-top

COPY . ./

RUN npm ci

LABEL title="Career-Top"
LABEL description="Career Top - AI Job Search and Resume Builder"



CMD npm run dev