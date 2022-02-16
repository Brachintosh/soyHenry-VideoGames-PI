const { Videogame, Platform, Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model:', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Name Validator:', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });
  });
});

 // Testing:
 
 describe('Description Validator:', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('description', () => {
    it('should throw an error if description is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid description')))
        .catch(() => done());
    });
    it('should work when its a valid description', () => {
      Videogame.create({ description: 'Some day i will go to the moon...' });
    });
  });
});

describe('releaseDate Validator:', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('releaseDate', () => {
    it('should throw an error if releaseDate is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid releaseDate')))
        .catch(() => done());
    });
    it('should work when its a valid releaseDate', () => {
      Videogame.create({ releaseDate: '5 - 10' });
    });
  });
});

describe('Videogame Image Validator:', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('background_image', () => {
    it('should throw an error if background_image is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid link for background_image')))
        .catch(() => done());
    });
    it('should work when its a valid link for background_image', () => {
      Videogame.create({ image: 'https://www.lookslikefilm.com/wp-content/uploads/2019/02/Danielle-Kilgore-Hack.jpg' });
    });
  });
});

describe('Rating Validator:', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('rating', () => {
    it('should throw an error if rating is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid rating')))
        .catch(() => done());
    });
    it('should work when its a valid rating', () => {
      Videogame.create({ rating: '1' });
    });
  });
});

describe('created_InDB Validator:', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('created_inDB', () => {
    it('should throw an error if created_inDB is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a created_inDB value')))
        .catch(() => done());
    });
    it('should work when it has created_inDB', () => {
      Videogame.create({ created_inDB:{defaultValue: true} });
    });
  });
});

// ----------  PLATFORM -------- MODEL -----------------

describe('Platform model:', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('id Validator:', () => {
    beforeEach(() => Platform.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is null', (done) => {
        Platform.create({})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should work when it has a valid id', () => {
        Platform.create({ id: '1' });
      });
    });
  });
});

describe('Name Validator:', () => {
  beforeEach(() => Platform.sync({ force: true }));
  describe('name', () => {
    it('should throw an error if name is null', (done) => {
      Platform.create({})
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid name', () => {
      Platform.create({ name: 'PC' });
    });
  });
});

// ----------  GENRE -------- MODEL -----------------

describe('Genre model:', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('id Validator:', () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is null', (done) => {
        Genre.create({})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should work when it has a valid id', () => {
        Genre.create({ id: '1' });
      });
    });
  });
});

describe('Name Validator:', () => {
  beforeEach(() => Genre.sync({ force: true }));
  describe('name', () => {
    it('should throw an error if name is null', (done) => {
      Genre.create({})
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid name', () => {
      Genre.create({ name: 'Action' });
    });
  });
});